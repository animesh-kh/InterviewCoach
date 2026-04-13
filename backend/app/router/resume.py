import sys
import os

# Add project root (InterviewCoach) to Python path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File,Form
from core.auth import get_current_user
from core.database import supabase
from services.resume_service import screen_resume
from resume_analyzer.analyzer import ResumeAnalyzer

router = APIRouter(prefix="/resumes", tags=["Resumes"])


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user=Depends(get_current_user)
):
    """Upload a resume, run screening, and save results to DB."""
    try:
        file_bytes = await file.read()

        # Call the resume screening function (plug in real one in services/resume_service.py)
        result = screen_resume(file_bytes, file.filename)

        # Save to Supabase
        response = supabase.table("resumes").insert({
            "user_id": str(user.id),
            "ats_score": result.get("ats_score"),
            "structured_data": result.get("structured_data")
        }).execute()

        return response.data[0]

    except NotImplementedError:
        raise HTTPException(status_code=501, detail="Resume screening not yet implemented")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_my_resumes(user=Depends(get_current_user)):
    """Get all resumes for the logged-in user."""
    response = supabase.table("resumes") \
        .select("*") \
        .eq("user_id", str(user.id)) \
        .order("created_at", desc=True) \
        .execute()
    return response.data


@router.get("/{resume_id}")
def get_resume(resume_id: str, user=Depends(get_current_user)):
    """Get a single resume with its screening results."""
    response = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", str(user.id)) \
        .single() \
        .execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Resume not found")
    return response.data


import tempfile
import os

@router.post("/analyze")
async def analyze_resume(
        file: UploadFile = File(..., description="Resume file — PDF or DOCX"),
        role: str = Form(..., description="Target job role"),
        experience: str = Form(..., description="Experience level"),
        user=Depends(get_current_user)
):
    # ── 1. Validate file ───────────────────────────────────────────────
    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    filename = file.filename.lower()
    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF or DOCX files are supported."
        )

    # ── 2. Save temp file (IMPORTANT FIX) ──────────────────────────────
    try:
        suffix = ".pdf" if filename.endswith(".pdf") else ".docx"

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_file.write(file_bytes)
            temp_path = temp_file.name

        # ── 3. Run analyzer correctly ─────────────────────────────────
        analyser = ResumeAnalyzer()
        analysis: dict = analyser.analyze(temp_path, role, experience)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")

    finally:
        # ── 4. Cleanup temp file ──────────────────────────────────────
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)

    # ── 5. Save to DB ────────────────────────────────────────────────
    try:
        db_response = supabase.table("resumes").insert({
            "user_id": str(user.id),
            "ats_score": analysis.get("ats"),
            "structured_data": analysis
        }).execute()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save analysis: {e}")

    saved_row = db_response.data[0]

    # ── 6. Return response ───────────────────────────────────────────
    return {
        "id": saved_row["id"],
        "created_at": saved_row["created_at"],
        **analysis
    }