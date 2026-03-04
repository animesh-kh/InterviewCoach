from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


# ── Auth ─────────────────────────────────────────────────────────────────────

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


class PasswordResetRequest(BaseModel):
    email: EmailStr


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    user_id: str
    email: str


# ── Resume ────────────────────────────────────────────────────────────────────

class ResumeUploadResponse(BaseModel):
    id: UUID
    user_id: UUID
    ats_score: Optional[float]
    structured_data: Optional[dict]
    created_at: datetime


# ── Interview ─────────────────────────────────────────────────────────────────

class StartInterviewRequest(BaseModel):
    resume_id: UUID
    job_role: str
    interview_type: str  # e.g. "technical", "behavioral", "mixed"


class SaveInterviewRequest(BaseModel):
    interview_id: UUID
    overall_score: float
    ai_feedback: str


class InterviewResponse(BaseModel):
    id: UUID
    user_id: UUID
    resume_id: Optional[UUID]
    job_role: str
    interview_type: str
    overall_score: Optional[float]
    ai_feedback: Optional[str]
    created_at: datetime