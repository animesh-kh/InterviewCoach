from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import auth, resume, interview

app = FastAPI(
    title="AI Interview Coach API",
    description="Backend for resume screening and AI interview coaching.",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restrict to your frontend URL in production
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(resume.router)
app.include_router(interview.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "AI Interview Coach API is running"}
