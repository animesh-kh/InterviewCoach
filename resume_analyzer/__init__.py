"""
resume_analyzer
---------------
A Python package for resume skill gap analysis.

Your backend teammate only needs:

    from resume_analyzer import ResumeAnalyzer

    ra     = ResumeAnalyzer()
    result = ra.analyze("resume.pdf", "Machine Learning", "entry")
"""

from .analyzer import ResumeAnalyzer

__all__ = ["ResumeAnalyzer"]
