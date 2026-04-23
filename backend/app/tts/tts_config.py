"""
TTS Configuration
-----------------
Loads Cloudflare credentials from environment variables.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class TTSConfig:
    """Holds all configuration needed for the Cloudflare TTS API."""

    CLOUDFLARE_ACCOUNT_ID: str = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")
    CLOUDFLARE_API_TOKEN: str = os.environ.get("CLOUDFLARE_API_TOKEN", "")
    CLOUDFLARE_TTS_MODEL: str = os.environ.get(
        "CLOUDFLARE_TTS_MODEL", "@cf/deepgram/aura-1"
    )

    # Base URL template – account ID is injected at runtime
    BASE_URL: str = (
        "https://api.cloudflare.com/client/v4/accounts"
        "/{account_id}/ai/run/{model}"
    )

    @classmethod
    def get_api_url(cls) -> str:
        """Return the fully-formed Cloudflare Workers AI endpoint URL."""
        return cls.BASE_URL.format(
            account_id=cls.CLOUDFLARE_ACCOUNT_ID,
            model=cls.CLOUDFLARE_TTS_MODEL,
        )

    @classmethod
    def validate(cls) -> None:
        """Raise if required env vars are missing."""
        missing = []
        if not cls.CLOUDFLARE_ACCOUNT_ID:
            missing.append("CLOUDFLARE_ACCOUNT_ID")
        if not cls.CLOUDFLARE_API_TOKEN:
            missing.append("CLOUDFLARE_API_TOKEN")
        if missing:
            raise EnvironmentError(
                f"Missing required environment variables: {', '.join(missing)}. "
                "Please set them in your .env file."
            )
