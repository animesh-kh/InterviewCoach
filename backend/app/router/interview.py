"""
Interview Router
----------------
Endpoints for managing AI-powered interview sessions.
Uses interview_module for AI logic, TTS for audio output, and STT for audio input.
"""

import sys
import os
import uuid
import base64

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from core.auth import get_current_user
from core.database import supabase
from tts import CloudflareTTS
from stt import CloudflareSTT

# ── Add interview_module to Python path ───────────────────────────────
# The interview_module lives at the project root, outside of backend/app
INTERVIEW_MODULE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "interview_module")
)
if INTERVIEW_MODULE_PATH not in sys.path:
    sys.path.insert(0, INTERVIEW_MODULE_PATH)

from start_interview import start_interview as ai_start_interview
from next_question import next_question as ai_next_question
from get_question import get_question as ai_get_question
from get_result import get_result as ai_get_result

router = APIRouter(prefix="/interviews", tags=["Interviews"])


# ── POST /interviews/start ────────────────────────────────────────────

@router.post("/start")
async def start_interview(
    resume: UploadFile = File(...),
    job_role: str = Form(...),
    seniority: str = Form(...),
    user=Depends(get_current_user),
):
    """
    Start a new interview session.

    Flow:
        1. Generate a unique interview_id.
        2. Read the uploaded resume PDF bytes.
        3. Call interview_module.start_interview() → gets intro, first_question, status.
        4. If success, convert intro + first_question to speech via TTS.
        5. Return text + audio (base64) + interview_id to the frontend.
    """
    try:
        # 1. Generate a unique interview ID
        interview_id = str(uuid.uuid4())

        # 2. Read the resume file
        resume_bytes = await resume.read()
        if not resume_bytes:
            raise HTTPException(status_code=400, detail="Resume file is empty.")

        # 3. Call interview_module's start_interview
        result = ai_start_interview(interview_id, job_role, seniority, resume_bytes)

        if result.get("status") != "success":
            raise HTTPException(
                status_code=500,
                detail=result.get("message", "Failed to start interview."),
            )

        intro_text = result["intro"]
        first_question_text = result["first_question"]

        # 4. Save interview record to backend database (same ID as interview_module)
        supabase.table("interviews").insert({
            "id": interview_id,
            "user_id": str(user.id),
            "job_role": job_role,
            "interview_type": seniority,
        }).execute()

        # 5. Convert intro and first question to speech via TTS
        tts = CloudflareTTS()

        intro_audio_bytes = await tts.synthesize(intro_text)
        question_audio_bytes = await tts.synthesize(first_question_text)

        # Encode audio as base64 so it can be sent in JSON
        intro_audio_b64 = base64.b64encode(intro_audio_bytes).decode("utf-8")
        question_audio_b64 = base64.b64encode(question_audio_bytes).decode("utf-8")

        # 6. Return everything to the frontend
        return JSONResponse(content={
            "status": "success",
            "interview_id": interview_id,
            "intro": {
                "text": intro_text,
                "audio_base64": intro_audio_b64,
            },
            "first_question": {
                "text": first_question_text,
                "audio_base64": question_audio_b64,
            },
        })

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── POST /interviews/get-follow-up ────────────────────────────────────

@router.post("/get-follow-up")
async def get_follow_up(
    interview_id: str = Form(...),
    question_number: int = Form(...),
    answer_type: str = Form(...),
    answer_text: str = Form(None),
    answer_audio: UploadFile = File(None),
    user=Depends(get_current_user),
):
    """
    Submit the user's answer to the current main question and get a follow-up.

    Parameters (form data):
        - interview_id: the interview_module interview ID
        - question_number: current question number (1-5)
        - answer_type: "text" or "audio"
        - answer_text: the text answer (required if answer_type is "text")
        - answer_audio: the audio file (required if answer_type is "audio")

    Flow:
        1. If answer_type is "audio", convert to text via STT.
        2. Call interview_module.next_question() → gets follow-up question.
        3. Convert follow-up to speech via TTS.
        4. Return follow-up as text + audio.
    """
    try:
        # 1. Resolve the answer text
        if answer_type == "audio":
            if not answer_audio:
                raise HTTPException(status_code=400, detail="Audio file is required when answer_type is 'audio'.")

            audio_bytes = await answer_audio.read()
            if not audio_bytes:
                raise HTTPException(status_code=400, detail="Audio file is empty.")

            stt = CloudflareSTT()
            content_type = answer_audio.content_type or "audio/mpeg"
            stt_result = await stt.transcribe(audio_bytes, content_type=content_type)
            user_answer = stt_result.get("text", "")

            if not user_answer:
                raise HTTPException(status_code=400, detail="Could not transcribe audio.")

        elif answer_type == "text":
            if not answer_text:
                raise HTTPException(status_code=400, detail="answer_text is required when answer_type is 'text'.")
            user_answer = answer_text

        else:
            raise HTTPException(status_code=400, detail="answer_type must be 'text' or 'audio'.")

        # 2. Call interview_module's next_question
        result = ai_next_question(interview_id, question_number, user_answer)

        if result.get("status") != "success":
            raise HTTPException(
                status_code=500,
                detail=result.get("message", "Failed to generate follow-up."),
            )

        follow_up_text = result["follow_up"]

        # 3. Convert follow-up to speech via TTS
        tts = CloudflareTTS()
        follow_up_audio_bytes = await tts.synthesize(follow_up_text)
        follow_up_audio_b64 = base64.b64encode(follow_up_audio_bytes).decode("utf-8")

        # 4. Return follow-up as text + audio
        return JSONResponse(content={
            "status": "success",
            "follow_up": {
                "text": follow_up_text,
                "audio_base64": follow_up_audio_b64,
            },
            "answer_received": user_answer,
        })

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── POST /interviews/get-next-question ────────────────────────────────

@router.post("/get-next-question")
async def get_next_question(
    interview_id: str = Form(...),
    question_number: int = Form(...),
    answer_type: str = Form(...),
    answer_text: str = Form(None),
    answer_audio: UploadFile = File(None),
    user=Depends(get_current_user),
):
    """
    Submit the follow-up answer and get the next main question.

    Parameters (form data):
        - interview_id: the interview_module interview ID
        - question_number: the NEXT question number to fetch (2-5)
        - answer_type: "text" or "audio"
        - answer_text: follow-up answer as text (if answer_type is "text")
        - answer_audio: follow-up answer as audio file (if answer_type is "audio")

    Flow:
        1. If answer_type is "audio", convert to text via STT.
        2. Call interview_module.get_question(interview_id, question_number, prev_fa)
           → saves prev follow-up answer, fetches next main question.
        3. Convert next question to speech via TTS.
        4. Return next question as text + audio.
    """
    try:
        # 1. Resolve the follow-up answer text
        if answer_type == "audio":
            if not answer_audio:
                raise HTTPException(status_code=400, detail="Audio file is required when answer_type is 'audio'.")

            audio_bytes = await answer_audio.read()
            if not audio_bytes:
                raise HTTPException(status_code=400, detail="Audio file is empty.")

            stt = CloudflareSTT()
            content_type = answer_audio.content_type or "audio/mpeg"
            stt_result = await stt.transcribe(audio_bytes, content_type=content_type)
            prev_fa = stt_result.get("text", "")

            if not prev_fa:
                raise HTTPException(status_code=400, detail="Could not transcribe audio.")

        elif answer_type == "text":
            if not answer_text:
                raise HTTPException(status_code=400, detail="answer_text is required when answer_type is 'text'.")
            prev_fa = answer_text

        else:
            raise HTTPException(status_code=400, detail="answer_type must be 'text' or 'audio'.")

        # 2. Call interview_module's get_question
        result = ai_get_question(interview_id, question_number, prev_fa=prev_fa)

        if result.get("status") != "success":
            raise HTTPException(
                status_code=500,
                detail=result.get("message", "Failed to get next question."),
            )

        next_question_text = result["question"]

        # 3. Convert next question to speech via TTS
        tts = CloudflareTTS()
        question_audio_bytes = await tts.synthesize(next_question_text)
        question_audio_b64 = base64.b64encode(question_audio_bytes).decode("utf-8")

        # 4. Return next question as text + audio
        return JSONResponse(content={
            "status": "success",
            "question": {
                "text": next_question_text,
                "audio_base64": question_audio_b64,
            },
            "answer_received": prev_fa,
        })

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── POST /interviews/end ──────────────────────────────────────────────

@router.post("/end")
async def end_interview(
    interview_id: str = Form(...),
    answer_type: str = Form(...),
    answer_text: str = Form(None),
    answer_audio: UploadFile = File(None),
    user=Depends(get_current_user),
):
    """
    End the interview, get the final evaluation, and save results.

    Parameters (form data):
        - interview_id: the shared interview ID (same for both DBs)
        - answer_type: "text" or "audio"
        - answer_text: last follow-up answer as text (if answer_type is "text")
        - answer_audio: last follow-up answer as audio file (if answer_type is "audio")

    Flow:
        1. If answer_type is "audio", convert to text via STT.
        2. Call interview_module.get_result(interview_id, last_followup_answer)
           → evaluates transcript, deletes from interview_module DB.
        3. Save score + feedback to backend database.
        4. Return results to frontend.
    """
    try:
        # 1. Resolve the last follow-up answer
        if answer_type == "audio":
            if not answer_audio:
                raise HTTPException(status_code=400, detail="Audio file is required when answer_type is 'audio'.")

            audio_bytes = await answer_audio.read()
            if not audio_bytes:
                raise HTTPException(status_code=400, detail="Audio file is empty.")

            stt = CloudflareSTT()
            content_type = answer_audio.content_type or "audio/mpeg"
            stt_result = await stt.transcribe(audio_bytes, content_type=content_type)
            last_fa = stt_result.get("text", "")

            if not last_fa:
                raise HTTPException(status_code=400, detail="Could not transcribe audio.")

        elif answer_type == "text":
            if not answer_text:
                raise HTTPException(status_code=400, detail="answer_text is required when answer_type is 'text'.")
            last_fa = answer_text

        else:
            raise HTTPException(status_code=400, detail="answer_type must be 'text' or 'audio'.")

        # 2. Call interview_module's get_result
        result = ai_get_result(interview_id, last_fa)

        if result.get("status") != "success":
            raise HTTPException(
                status_code=500,
                detail=result.get("message", "Failed to get interview results."),
            )

        score = result["score"]
        feedback = result["feedback"]

        # 3. Save score + feedback to backend database (same interview_id)
        supabase.table("interviews").update({
            "overall_score": score,
            "ai_feedback": feedback,
        }).eq("id", interview_id).eq("user_id", str(user.id)).execute()

        # 4. Return results to frontend
        return JSONResponse(content={
            "status": "success",
            "score": score,
            "feedback": feedback,
        })

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── GET /interviews/ ─────────────────────────────────────────────────

@router.get("/")
def get_all_interviews(user=Depends(get_current_user)):
    """Get all interviews for the logged-in user, sorted by newest first."""
    try:
        response = supabase.table("interviews") \
            .select("*") \
            .eq("user_id", str(user.id)) \
            .order("created_at", desc=True) \
            .execute()

        return {"status": "success", "interviews": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── GET /interviews/{interview_id} ───────────────────────────────────

@router.get("/{interview_id}")
def get_interview(interview_id: str, user=Depends(get_current_user)):
    """Get details of a single interview by ID."""
    try:
        response = supabase.table("interviews") \
            .select("*") \
            .eq("id", interview_id) \
            .eq("user_id", str(user.id)) \
            .single() \
            .execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Interview not found.")

        return {"status": "success", "interview": response.data}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))