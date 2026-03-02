from fastapi import FastAPI
from sqlalchemy import text
from db.database import engine

app = FastAPI()

@app.get("/test-db")
def test_db():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"message": "Supabase connected successfully"}