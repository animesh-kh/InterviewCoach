import os
from dotenv import load_dotenv
from groq import Groq
from supabase import create_client, Client

load_dotenv()

# Shared Clients
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))