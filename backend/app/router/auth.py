from fastapi import APIRouter, HTTPException, Header
from models.schemas import SignUpRequest, SignInRequest, PasswordResetRequest, AuthResponse
from core.database import supabase

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=AuthResponse)
def sign_up(body: SignUpRequest):
    try:
        res = supabase.auth.sign_up({
            "email": body.email,
            "password": body.password,
            "options": {"data": {"full_name": body.full_name}}
        })

        return AuthResponse(
            access_token=res.session.access_token,
            refresh_token=res.session.refresh_token,
            user_id=str(res.user.id),
            email=res.user.email
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
 

@router.post("/signin", response_model=AuthResponse)
def sign_in(body: SignInRequest):
    try:
        res = supabase.auth.sign_in_with_password({
            "email": body.email,
            "password": body.password
        })

        return AuthResponse(
            access_token=res.session.access_token,
            refresh_token=res.session.refresh_token,
            user_id=str(res.user.id),
            email=res.user.email
        )

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid email or password")


@router.post("/reset-password")
def reset_password(body: PasswordResetRequest):
    try:
        supabase.auth.reset_password_email(body.email)
        return {"message": "Password reset email sent"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/signout")
def sign_out():
    supabase.auth.sign_out()
    return {"message": "Signed out successfully"}


@router.get("/me")
def get_current_user(authorization: str = Header(None)):
    try:

        if not authorization:
            raise HTTPException(status_code=401, detail="Missing token")

        token = authorization.split(" ")[1]
        user = supabase.auth.get_user(token)

        return {
            "id": user.user.id,
            "email": user.user.email,
            "full_name": user.user.user_metadata.get("full_name")
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")