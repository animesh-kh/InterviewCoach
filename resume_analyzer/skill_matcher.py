"""
skill_matcher.py
----------------
Responsible for:
  1. Extracting text from PDF / DOCX / TXT resumes
  2. Extracting skills from any text using keyword matching
  3. Computing the skill gap (mandatory + optional) against role_skills_db
  4. Category-aware filtering (won't recommend Django if user knows Flask)

Internal module. Not meant to be used directly by the backend.
Use ResumeAnalyzer methods instead.
"""

import re
import os
import json
import pdfplumber
import docx


# ── Load data files ────────────────────────────────────────────────────────────
_DATA_DIR = os.path.dirname(__file__)

with open(os.path.join(_DATA_DIR, "role_skills_db.json")) as _f:
    ROLE_SKILLS_DB: dict = json.load(_f)

with open(os.path.join(_DATA_DIR, "skill_categories.json")) as _f:
    SKILL_CATEGORIES: dict = json.load(_f)

# Flat list of every known skill
ALL_SKILLS: list = [s for skills in SKILL_CATEGORIES.values() for s in skills]

# Reverse map: skill → category  e.g. "django" → "backend_framework"
SKILL_TO_CATEGORY: dict = {
    skill: category
    for category, skills in SKILL_CATEGORIES.items()
    for skill in skills
}


# ── Resume text extraction ─────────────────────────────────────────────────────

def extract_text_from_resume(file_path: str) -> str:
    """
    Extracts raw text from a resume file.

    Supports:
        .pdf  — via pdfplumber
        .docx — via python-docx
        .txt  — plain read

    Parameters:
        file_path : absolute or relative path to the resume file

    Returns:
        Extracted text as a single string.

    Raises:
        FileNotFoundError : if the file does not exist
        ValueError        : if the file extension is not supported
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Resume file not found: {file_path}")

    ext = os.path.splitext(file_path)[-1].lower()

    if ext == ".pdf":
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text

    elif ext == ".docx":
        doc = docx.Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])

    elif ext == ".txt":
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    else:
        raise ValueError(
            f"Unsupported file extension '{ext}'. "
            f"Accepted formats: .pdf, .docx, .txt"
        )


# ── Skill extraction ───────────────────────────────────────────────────────────

def extract_skills_from_text(text: str) -> list:
    """
    Scans a piece of text and returns all known skills found in it.

    Uses word-boundary regex for single-word skills to avoid false matches
    (e.g. "c" won't match inside "css" or "docker").

    Parameters:
        text : any raw text — resume body, job description, etc.

    Returns:
        Sorted list of matched skill strings (lowercase).
    """
    text = text.lower()
    found = []

    for skill in ALL_SKILLS:
        if " " in skill:
            # Multi-word skill: simple substring check
            if skill in text:
                found.append(skill)
        else:
            # Single-word skill: word-boundary match
            pattern = r"\b" + re.escape(skill) + r"\b"
            if re.search(pattern, text):
                found.append(skill)

    return sorted(set(found))


# ── Role matching ──────────────────────────────────────────────────────────────

def get_available_roles() -> list:
    """
    Returns all role names available in the skills database.

    Returns:
        List of role name strings.
    """
    return list(ROLE_SKILLS_DB.keys())


def _match_role(target_role: str) -> str:
    """
    Case-insensitive role lookup against ROLE_SKILLS_DB.

    Returns:
        Exact matched role name string.

    Raises:
        ValueError if role not found.
    """
    for role in ROLE_SKILLS_DB:
        if role.lower() == target_role.lower():
            return role
    raise ValueError(
        f"Role '{target_role}' not found in database.\n"
        f"Available roles: {get_available_roles()}"
    )


# ── Category-aware smart filter ────────────────────────────────────────────────

def _smart_filter(missing_skills: set, user_categories: set) -> tuple:
    """
    Filters out skills from missing_skills if the user already
    covers that skill's category.

    Example: user knows Flask (backend_framework) →
             Django (also backend_framework) gets skipped.

    Parameters:
        missing_skills  : set of skills the user doesn't have
        user_categories : set of categories already covered by user

    Returns:
        (kept, skipped) — two sorted lists
            kept    : skills to recommend
            skipped : skills filtered out with reason
    """
    kept    = []
    skipped = []

    for skill in missing_skills:
        cat = SKILL_TO_CATEGORY.get(skill)
        if cat and cat in user_categories:
            skipped.append({
                "skill" : skill,
                "reason": f"You already have a {cat} skill"
            })
        else:
            kept.append(skill)

    return sorted(kept), sorted(skipped, key=lambda x: x["skill"])


# ── Core gap computation ───────────────────────────────────────────────────────

def compute_skill_gap(
    resume_text     : str,
    target_role     : str,
    experience_level: str,
) -> dict:
    """
    Core function. Computes the full skill gap between resume and target role.

    Parameters:
        resume_text      : raw text extracted from the resume
        target_role      : role name (case-insensitive match against db)
        experience_level : "entry", "mid", or "senior"

    Returns:
        {
            "matched_role"     : str,
            "experience_level" : str,
            "user_skills"      : list,
            "mandatory_missing": list,   ← must learn
            "optional_missing" : list,   ← nice to have
            "skipped"          : list,   ← filtered due to category overlap
        }

    Raises:
        ValueError : if role not found or level not available
    """
    # Step 1: Match role
    matched_role = _match_role(target_role)
    role_data    = ROLE_SKILLS_DB[matched_role]

    # Step 2: Resolve level — fallback to "entry" if not found
    if experience_level not in role_data:
        experience_level = "entry"

    level_data    = role_data[experience_level]
    req_mandatory = set(level_data.get("mandatory", []))
    req_optional  = set(level_data.get("optional",  []))

    # Step 3: Extract user skills from resume
    user_skills = set(extract_skills_from_text(resume_text))

    # Step 4: Raw gap
    missing_mandatory = req_mandatory - user_skills
    missing_optional  = req_optional  - user_skills

    # Step 5: Build user category set
    user_categories = {
        SKILL_TO_CATEGORY[s]
        for s in user_skills
        if s in SKILL_TO_CATEGORY
    }

    # Step 6: Smart filter both lists
    mandatory_reco, m_skipped = _smart_filter(missing_mandatory, user_categories)
    optional_reco,  o_skipped = _smart_filter(missing_optional,  user_categories)

    return {
        "matched_role"     : matched_role,
        "experience_level" : experience_level,
        "user_skills"      : sorted(user_skills),
        "mandatory_missing": mandatory_reco,
        "optional_missing" : optional_reco,
        "skipped"          : m_skipped + o_skipped,
    }
