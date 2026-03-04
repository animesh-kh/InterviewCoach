from fastapi import APIRouter, Depends, HTTPException
from core.auth import get_current_user
from core.database import supabase
from models.schemas import StartInterviewRequest, SaveInterviewRequest
from services.interview_service import generate_questions

router = APIRouter(prefix="/interviews", tags=["Interviews"])


@router.post("/start")
def start_interview(
    body: StartInterviewRequest,
    user=Depends(get_current_user)
):
    """
    Start an interview session:
    1. Fetch the user's resume structured data
    2. Call AI to generate questions
    3. Create an interview record in the DB
    """
    try:
        # Fetch resume structured data
        resume_res = supabase.table("resumes") \
            .select("structured_data") \
            .eq("id", str(body.resume_id)) \
            .eq("user_id", str(user.id)) \
            .single() \
            .execute()

        if not resume_res.data:
            raise HTTPException(status_code=404, detail="Resume not found")

        structured_data = resume_res.data.get("structured_data", {})

        # Call the AI interview function (plug in real one in services/interview_service.py)
        questions = generate_questions(body.job_role, body.interview_type, structured_data)

        # Create interview record in DB
        interview_res = supabase.table("interviews").insert({
            "user_id": str(user.id),
            "resume_id": str(body.resume_id),
            "job_role": body.job_role,
            "interview_type": body.interview_type,
        }).execute()

        return {
            "interview": interview_res.data[0],
            "questions": questions
        }

    except NotImplementedError:
        raise HTTPException(status_code=501, detail="AI interview not yet implemented")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save")
def save_interview(
    body: SaveInterviewRequest,
    user=Depends(get_current_user)
):
    """Save the score and AI feedback after an interview session."""
    try:
        response = supabase.table("interviews") \
            .update({
                "overall_score": body.overall_score,
                "ai_feedback": body.ai_feedback
            }) \
            .eq("id", str(body.interview_id)) \
            .eq("user_id", str(user.id)) \
            .execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Interview not found")
        return response.data[0]

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_interview_history(user=Depends(get_current_user)):
    """Get full interview history for the logged-in user."""
    response = supabase.table("interviews") \
        .select("*") \
        .eq("user_id", str(user.id)) \
        .order("created_at", desc=True) \
        .execute()
    return response.data


@router.get("/{interview_id}")
def get_interview(interview_id: str, user=Depends(get_current_user)):
    """Get a single interview session with feedback."""
    response = supabase.table("interviews") \
        .select("*") \
        .eq("id", interview_id) \
        .eq("user_id", str(user.id)) \
        .single() \
        .execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Interview not found")
    return response.data