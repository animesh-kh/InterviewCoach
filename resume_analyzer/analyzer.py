"""
analyzer.py
-----------
The single public interface of the resume_analyzer package.

Your backend teammate only needs to import and use this class.
He does not need to touch skill_matcher.py or feedback.py at all.

Usage:
------
    from resume_analyzer import ResumeAnalyzer

    ra = ResumeAnalyzer()

    # Full analysis in one call
    result = ra.analyze("resume.pdf", "Machine Learning", "entry")

    # Or call individual methods as needed
    roles    = ra.get_available_roles()
    skills   = ra.extract_skills("resume.pdf")
    gap      = ra.get_skill_gap("resume.pdf", "Machine Learning", "entry")
    feedback = ra.get_feedback("Machine Learning", "entry", skills, gap["mandatory_missing"], gap["optional_missing"])
"""

from .skill_matcher import (
    extract_text_from_resume,
    extract_skills_from_text,
    compute_skill_gap,
    get_available_roles,
)
from .feedback import build_feedback


class ResumeAnalyzer:
    """
    Main class for resume skill gap analysis.

    Instantiate once and reuse across multiple requests.

    Example:
        ra = ResumeAnalyzer()
        result = ra.analyze("resume.pdf", "Machine Learning", "entry")
    """

    # ── Public: roles ──────────────────────────────────────────────────────────

    def get_available_roles(self) -> list:
        """
        Returns all roles available in the skills database.

        Returns:
            List of role name strings.

        Example:
            ra.get_available_roles()
            # → ["Machine Learning", "Django Developer", "Full Stack Developer", ...]
        """
        return get_available_roles()

    # ── Public: skill extraction ───────────────────────────────────────────────

    def extract_skills(self, resume_path: str) -> list:
        """
        Extracts and returns skills found in the resume file.

        Parameters:
            resume_path : path to .pdf, .docx, or .txt resume file

        Returns:
            Sorted list of skill strings found in the resume.

        Example:
            ra.extract_skills("john_resume.pdf")
            # → ["docker", "git", "python", "tensorflow", ...]
        """
        text = extract_text_from_resume(resume_path)
        return extract_skills_from_text(text)

    # ── Public: skill gap ──────────────────────────────────────────────────────

    def get_skill_gap(
        self,
        resume_path     : str,
        target_role     : str,
        experience_level: str,
    ) -> dict:
        """
        Computes the skill gap between the resume and the target role.

        Parameters:
            resume_path      : path to .pdf, .docx, or .txt resume file
            target_role      : role to compare against (case-insensitive)
            experience_level : "entry", "mid", or "senior"

        Returns:
            {
                "matched_role"     : str,
                "experience_level" : str,
                "user_skills"      : list,
                "mandatory_missing": list,
                "optional_missing" : list,
                "skipped"          : list[dict],  each has "skill" and "reason"
            }

        Example:
            ra.get_skill_gap("resume.pdf", "Machine Learning", "entry")
        """
        text = extract_text_from_resume(resume_path)
        return compute_skill_gap(text, target_role, experience_level)

    # ── Public: feedback ───────────────────────────────────────────────────────

    def get_feedback(
        self,
        role       : str,
        level      : str,
        user_skills: list,
        mandatory  : list,
        optional   : list,
    ) -> str:
        """
        Generates a second-person feedback string based on the skill gap.

        Parameters:
            role        : role name string
            level       : "entry", "mid", or "senior"
            user_skills : list of skills found in the resume
            mandatory   : list of mandatory skills the user is missing
            optional    : list of optional skills the user is missing

        Returns:
            A human-readable feedback string addressed to the candidate.

        Example:
            ra.get_feedback(
                role        = "Machine Learning",
                level       = "entry",
                user_skills = ["python", "numpy"],
                mandatory   = ["statistics"],
                optional    = ["jupyter"]
            )
        """
        return build_feedback(role, level, user_skills, mandatory, optional)

    # ── Public: full pipeline in one call ─────────────────────────────────────

    def analyze(
        self,
        resume_path     : str,
        target_role     : str,
        experience_level: str,
    ) -> dict:
        """
        Runs the full analysis pipeline in a single call.
        This is the primary method your backend teammate will use.

        Parameters:
            resume_path      : path to .pdf, .docx, or .txt resume file
            target_role      : role to compare against (case-insensitive)
            experience_level : "entry", "mid", or "senior"

        Returns:
            {
                "role"             : str,
                "experience_level" : str,
                "user_skills"      : list,
                "mandatory_missing": list,   ← skills user MUST learn
                "optional_missing" : list,   ← skills that add value
                "skipped_skills"   : list,   ← filtered (category already covered)
                "feedback_text"    : str,    ← human-readable feedback
            }

        Raises:
            FileNotFoundError : if resume file does not exist
            ValueError        : if role or level is invalid

        Example:
            ra = ResumeAnalyzer()
            result = ra.analyze("resume.pdf", "Machine Learning", "entry")
            print(result["feedback_text"])
            print(result["mandatory_missing"])
        """
        # Step 1: Extract text from resume file
        resume_text = extract_text_from_resume(resume_path)

        # Step 2: Compute skill gap
        gap = compute_skill_gap(resume_text, target_role, experience_level)

        # Step 3: Generate feedback string
        feedback = build_feedback(
            role        = gap["matched_role"],
            level       = gap["experience_level"],
            user_skills = gap["user_skills"],
            mandatory   = gap["mandatory_missing"],
            optional    = gap["optional_missing"],
        )
        ats = 100
        # Step 4: Return clean result dict
        return {
            "role"             : gap["matched_role"],
            "experience_level" : gap["experience_level"],
            "user_skills"      : gap["user_skills"],
            "mandatory_missing": gap["mandatory_missing"],
            "optional_missing" : gap["optional_missing"],
            "skipped_skills"   : [s["skill"] for s in gap["skipped"]],
            "feedback_text"    : feedback,
            "ats" : ats,
        }
