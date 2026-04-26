import os
import json
import io
import PyPDF2
from dotenv import load_dotenv
from groq import Groq # <--- Make sure this is here!
from supabase import create_client, Client as SupabaseClient

# Load the common .env file from backend/app/
_env_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "backend", "app", ".env")
)
load_dotenv(_env_path)

# 1. Initialize Groq Client
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# 2. Initialize Supabase Client (uses interview_module's own database)
supabase: SupabaseClient = create_client(
    os.environ.get("INTERVIEW_SUPABASE_URL"),
    os.environ.get("INTERVIEW_SUPABASE_KEY"),
)

def extract_text_from_pdf(pdf_bytes):
    """Parses raw PDF bytes into a clean string."""
    try:
        resume_stream = io.BytesIO(pdf_bytes)
        reader = PyPDF2.PdfReader(resume_stream)
        text = ""
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""

def start_interview(interview_id, role, seniority, resume_bytes):
    # 1. Get the text from the resume
    resume_text = extract_text_from_pdf(resume_bytes)

    # 2. Build the Prompt for Groq (Llama 3.3 70B is excellent at this)
    prompt = f"""
    Role: {role}, Seniority: {seniority}, Resume: {resume_text}
    Generate:
    1. context_summary: 2-3 sentences about the candidate.
    2. intro: A warm greeting.
    3. questions: A list of 5 technical interview questions.

    Return ONLY a JSON object with keys: "context_summary", "intro", "questions".
    """

    try:
        # Use Groq instead of Gemini
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"} # This ensures valid JSON
        )

        ai_data = json.loads(response.choices[0].message.content)

        # 3. Prepare the Supabase Payload
        payload = {
            "interview_id": interview_id,
            "context_summary": ai_data["context_summary"],
            "slot_1": {"q": ai_data["questions"][0], "a": None, "fq": None, "fa": None},
            "slot_2": {"q": ai_data["questions"][1], "a": None, "fq": None, "fa": None},
            "slot_3": {"q": ai_data["questions"][2], "a": None, "fq": None, "fa": None},
            "slot_4": {"q": ai_data["questions"][3], "a": None, "fq": None, "fa": None},
            "slot_5": {"q": ai_data["questions"][4], "a": None, "fq": None, "fa": None},
        }

        # 4. Insert into Supabase
        supabase.table("interviews").insert(payload).execute()

        return {
            "status": "success",
            "intro": ai_data["intro"],
            "first_question": ai_data["questions"][0]
        }

    except Exception as e:
        return {"status": "error", "message": f"Groq Error: {str(e)}"}