"""
feedback.py
-----------
Responsible for building the human-readable feedback string.
Pure string logic — no ML model needed.

Internal module. Not meant to be used directly by the backend.
Use ResumeAnalyzer.get_feedback() or ResumeAnalyzer.analyze() instead.
"""


def build_feedback(
    role: str,
    level: str,
    user_skills: list,
    mandatory: list,
    optional: list,
) -> str:
    """
    Builds a second-person feedback message based on the skill gap result.

    Parameters:
        role        : matched role name  e.g. "Machine Learning"
        level       : experience level   e.g. "entry", "mid", "senior"
        user_skills : skills found in the resume
        mandatory   : mandatory skills the user is missing
        optional    : optional skills the user is missing

    Returns:
        A clean, encouraging feedback string addressed directly to the candidate.
    """

    LEVEL_LABELS = {
        "entry" : "entry-level",
        "mid"   : "mid-level",
        "senior": "senior-level",
    }
    level_label = LEVEL_LABELS.get(level, level)

    lines = []

    # ── Opening ──────────────────────────────────────────────────
    lines.append(
        f"You're applying for a {level_label} {role} position — here's where you stand."
    )

    # ── Skills the user already has ──────────────────────────────
    if user_skills:
        top  = ", ".join(user_skills[:6])
        more = f" and {len(user_skills) - 6} more" if len(user_skills) > 6 else ""
        lines.append(
            f"You already have a solid foundation with {top}{more}. That's a great start."
        )
    else:
        lines.append(
            "Your resume didn't list many recognisable technical skills yet — "
            "that's okay, let's focus on what to build."
        )

    # ── Mandatory missing ─────────────────────────────────────────
    if mandatory:
        m_list = ", ".join(mandatory)
        lines.append(
            f"To be competitive for this role, you must learn: {m_list}. "
            f"These are non-negotiable skills that employers expect at the "
            f"{level_label} level — prioritise these first."
        )
    else:
        lines.append(
            "Great news — you already cover all the mandatory skills for this role!"
        )

    # ── Optional missing ──────────────────────────────────────────
    if optional:
        o_list = ", ".join(optional)
        lines.append(
            f"Once you're comfortable with the mandatory skills, consider picking up: {o_list}. "
            f"These are not required but will make your profile significantly stronger "
            f"and help you stand out from other candidates."
        )

    # ── Closing encouragement (scales with gap size) ──────────────
    total_missing = len(mandatory) + len(optional)

    if total_missing == 0:
        lines.append(
            "Your resume looks well-rounded for this role. "
            "Focus on building strong projects to back up your skills."
        )
    elif total_missing <= 3:
        lines.append("You're very close — just a few gaps to fill. Keep going!")
    elif total_missing <= 7:
        lines.append(
            "You have a clear learning path ahead. Take it one skill at a time and you'll be ready soon."
        )
    else:
        lines.append(
            "There's a decent amount to learn, but don't get overwhelmed. "
            "Focus on mandatory skills first and build from there."
        )

    return " ".join(lines)
