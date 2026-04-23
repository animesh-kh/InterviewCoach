"""
STT Configuration
-----------------
Loads Cloudflare credentials from environment variables for Speech-to-Text.
Reuses the same CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN as TTS.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class STTConfig:
    """Holds all configuration needed for the Cloudflare STT API."""

    CLOUDFLARE_STT_ACCOUNT_ID: str = os.environ.get("CLOUDFLARE_STT_ACCOUNT_ID", "")
    CLOUDFLARE_STT_API_TOKEN: str = os.environ.get("CLOUDFLARE_STT_API_TOKEN", "")
    CLOUDFLARE_STT_MODEL: str = os.environ.get(
        "CLOUDFLARE_STT_MODEL", "@cf/deepgram/nova-3"
    )

    # Base URL template – account ID and model injected at runtime
    BASE_URL: str = (
        "https://api.cloudflare.com/client/v4/accounts"
        "/{account_id}/ai/run/{model}"
    )

    @classmethod
    def get_api_url(cls) -> str:
        """Return the fully-formed Cloudflare Workers AI STT endpoint URL."""
        return cls.BASE_URL.format(
            account_id=cls.CLOUDFLARE_STT_ACCOUNT_ID,
            model=cls.CLOUDFLARE_STT_MODEL,
        )

    @classmethod
    def validate(cls) -> None:
        """Raise if required env vars are missing."""
        missing = []
        if not cls.CLOUDFLARE_STT_ACCOUNT_ID:
            missing.append("CLOUDFLARE_STT_ACCOUNT_ID")
        if not cls.CLOUDFLARE_STT_API_TOKEN:
            missing.append("CLOUDFLARE_STT_API_TOKEN")
        if missing:
            raise EnvironmentError(
                f"Missing required environment variables: {', '.join(missing)}. "
                "Please set them in your .env file."
            )
