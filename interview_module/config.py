import os
from dotenv import dotenv_values
from groq import Groq
from supabase import create_client, Client

# Load variables from the .env in THIS module's directory (isolated from backend .env)
_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
_env = dotenv_values(_env_path)

# Shared Clients
groq_client = Groq(api_key=_env.get("GROQ_API_KEY"))
supabase: Client = create_client(_env.get("SUPABASE_URL"), _env.get("SUPABASE_KEY"))