"""
example_usage.py
----------------
This file is for your backend teammate.
Shows every method available on ResumeAnalyzer and what they return.

Run this file directly to test the module:
    python example_usage.py
"""

from resume_analyzer import ResumeAnalyzer

# ── Instantiate once — reuse across all requests ───────────────────────────────
ra = ResumeAnalyzer()


# ─────────────────────────────────────────────────────────────────────────────
# METHOD 1: Full pipeline in one call (most common usage)
# Your backend route will mostly just call this
# ─────────────────────────────────────────────────────────────────────────────

result = ra.analyze(
    resume_path      = "path/to/resume.pdf",   # .pdf / .docx / .txt
    target_role      = "Machine Learning",      # must match a role in the db
    experience_level = "entry",                 # "entry" / "mid" / "senior"
)

# result is a plain dict — pass it directly to JSONResponse in FastAPI/Flask
print("=== Full Analysis ===")
print("Role            :", result["role"])
print("Level           :", result["experience_level"])
print("User Skills     :", result["user_skills"])
print("Must Learn      :", result["mandatory_missing"])
print("Good to Have    :", result["optional_missing"])
print("Skipped         :", result["skipped_skills"])
print("Feedback        :", result["feedback_text"])


# ─────────────────────────────────────────────────────────────────────────────
# METHOD 2: Get all available roles
# Use this to populate a dropdown on the frontend
# ─────────────────────────────────────────────────────────────────────────────

roles = ra.get_available_roles()
print("\n=== Available Roles ===")
print(roles)
# → ["Machine Learning", "Django Developer", "Full Stack Developer", ...]


# ─────────────────────────────────────────────────────────────────────────────
# METHOD 3: Extract skills only (no gap analysis)
# Useful if you just want to see what skills are in a resume
# ─────────────────────────────────────────────────────────────────────────────

skills = ra.extract_skills("path/to/resume.pdf")
print("\n=== Skills Found in Resume ===")
print(skills)
# → ["docker", "git", "machine learning", "numpy", "python", ...]


# ─────────────────────────────────────────────────────────────────────────────
# METHOD 4: Get skill gap only (no feedback text)
# Useful if your backend wants raw gap data without feedback
# ─────────────────────────────────────────────────────────────────────────────

gap = ra.get_skill_gap(
    resume_path      = "path/to/resume.pdf",
    target_role      = "Machine Learning",
    experience_level = "mid",
)
print("\n=== Skill Gap ===")
print("Mandatory Missing:", gap["mandatory_missing"])
print("Optional Missing :", gap["optional_missing"])
print("Skipped          :", gap["skipped"])        # includes reason per skill


# ─────────────────────────────────────────────────────────────────────────────
# METHOD 5: Get feedback string only
# Useful if your backend already has the gap data and just needs the text
# ─────────────────────────────────────────────────────────────────────────────

feedback = ra.get_feedback(
    role        = "Machine Learning",
    level       = "entry",
    user_skills = ["python", "numpy", "pandas", "scikit-learn"],
    mandatory   = ["statistics", "docker"],
    optional    = ["jupyter", "seaborn"],
)
print("\n=== Feedback Text ===")
print(feedback)


# ─────────────────────────────────────────────────────────────────────────────
# HOW YOUR BACKEND FRIEND USES THIS IN FASTAPI
# ─────────────────────────────────────────────────────────────────────────────

"""
# In his app.py:

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from resume_analyzer import ResumeAnalyzer
import tempfile, os

app = FastAPI()
ra  = ResumeAnalyzer()     # one instance, reused for all requests


@app.get("/roles")
def get_roles():
    return {"roles": ra.get_available_roles()}


@app.post("/analyze")
async def analyze(
    file            : UploadFile = File(...),
    target_role     : str        = Form(...),
    experience_level: str        = Form(...),
):
    ext = os.path.splitext(file.filename)[-1].lower()

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        result = ra.analyze(tmp_path, target_role, experience_level)
        return JSONResponse(result)
    finally:
        os.remove(tmp_path)
"""
