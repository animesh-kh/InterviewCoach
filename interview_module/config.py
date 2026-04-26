import os
from dotenv import load_dotenv
from groq import Groq
from supabase import create_client, Client

# Load the common .env file from backend/app/
_env_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "backend", "app", ".env")
)
load_dotenv(_env_path)

# Shared Clients (uses INTERVIEW_ prefixed Supabase credentials)
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
supabase: Client = create_client(
    os.environ.get("INTERVIEW_SUPABASE_URL"),
    os.environ.get("INTERVIEW_SUPABASE_KEY"),
)