from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from core.auth import get_current_user
from core.database import supabase
from services.resume_service import screen_resume

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