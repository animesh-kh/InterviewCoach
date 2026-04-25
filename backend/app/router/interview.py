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

# ── Add interview_module to Python path ───────────────────────────────
# The interview_module lives at the project root, outside of backend/app
INTERVIEW_MODULE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "interview_module")
)
if INTERVIEW_MODULE_PATH not in sys.path:
    sys.path.insert(0, INTERVIEW_MODULE_PATH)

from start_interview import start_interview as ai_start_interview

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

        # 4. Save interview record to backend database
        db_record = supabase.table("interviews").insert({
            "user_id": str(user.id),
            "job_role": job_role,
            "interview_type": seniority,
        }).execute()

        backend_interview_id = db_record.data[0]["id"]

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
            "backend_interview_id": str(backend_interview_id),
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