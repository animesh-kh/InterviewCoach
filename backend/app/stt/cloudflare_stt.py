"""
Cloudflare Speech-to-Text Service
----------------------------------
Wraps the Cloudflare Workers AI STT REST API into a clean,
class-based interface.

Usage:
    from stt.cloudflare_stt import CloudflareSTT

    stt = CloudflareSTT()

    # Async usage (recommended inside FastAPI endpoints)
    result = await stt.transcribe(audio_bytes)
    print(result["text"])

    # Transcribe directly from a file
    result = await stt.transcribe_file("recording.mp3")

    # Synchronous convenience wrapper
    result = stt.transcribe_sync(audio_bytes)
"""

from __future__ import annotations

import asyncio
import logging
from pathlib import Path
from typing import Any, Dict, Optional

import httpx

from .stt_config import STTConfig

logger = logging.getLogger(__name__)


class CloudflareSTTError(Exception):
    """Raised when the Cloudflare STT API returns an error."""


class CloudflareSTT:
    """
    Speech-to-Text client for the Cloudflare Workers AI API.

    Parameters
    ----------
    account_id : str, optional
        Override the account ID from the environment.
    api_token : str, optional
        Override the API token from the environment.
    model : str, optional
        Override the STT model (default: ``@cf/deepgram/nova-3``).
    timeout : float
        HTTP request timeout in seconds (default: 60).
    """

    # Supported audio MIME types
    SUPPORTED_CONTENT_TYPES = {
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
        ".webm": "audio/webm",
        ".m4a": "audio/mp4",
    }

    def __init__(
        self,
        account_id: Optional[str] = None,
        api_token: Optional[str] = None,
        model: Optional[str] = None,
        timeout: float = 60.0,
    ) -> None:
        # Allow constructor overrides; fall back to env vars
        self._account_id = account_id or STTConfig.CLOUDFLARE_STT_ACCOUNT_ID
        self._api_token = api_token or STTConfig.CLOUDFLARE_STT_API_TOKEN
        self._model = model or STTConfig.CLOUDFLARE_STT_MODEL
        self._timeout = timeout

        # Validate that we have the required credentials
        if not self._account_id or not self._api_token:
            STTConfig.validate()  # raises EnvironmentError with details

        self._url = STTConfig.BASE_URL.format(
            account_id=self._account_id, model=self._model
        )

    # ── Public async API ──────────────────────────────────────────────────

    async def transcribe(
        self,
        audio_data: bytes,
        content_type: str = "audio/mpeg",
    ) -> Dict[str, Any]:
        """
        Transcribe audio bytes to text.

        Parameters
        ----------
        audio_data : bytes
            Raw audio file bytes.
        content_type : str
            MIME type of the audio (default: ``audio/mpeg`` for MP3).

        Returns
        -------
        dict
            API response containing the transcription.
            Typically has a ``"text"`` key with the transcribed string.

        Raises
        ------
        CloudflareSTTError
            If the API returns a non-200 status or an error payload.
        ValueError
            If *audio_data* is empty.
        """
        if not audio_data:
            raise ValueError("Audio data must not be empty.")

        headers = {
            "Authorization": f"Bearer {self._api_token}",
            "Content-Type": content_type,
        }

        async with httpx.AsyncClient(timeout=self._timeout) as client:
            logger.info(
                "Requesting STT from Cloudflare (%d bytes, %s)",
                len(audio_data),
                content_type,
            )
            response = await client.post(
                self._url, headers=headers, content=audio_data
            )

        if response.status_code != 200:
            error_detail = response.text
            logger.error(
                "Cloudflare STT API error %s: %s",
                response.status_code,
                error_detail,
            )
            raise CloudflareSTTError(
                f"Cloudflare API returned {response.status_code}: {error_detail}"
            )

        result = response.json()
        logger.info("Transcription received successfully")
        return result.get("result", result)

    # ── File helper ───────────────────────────────────────────────────────

    async def transcribe_file(
        self, file_path: str | Path
    ) -> Dict[str, Any]:
        """
        Read an audio file from disk and transcribe it.

        The content type is inferred from the file extension.

        Parameters
        ----------
        file_path : str or Path
            Path to the audio file.

        Returns
        -------
        dict
            Transcription result from the API.
        """
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"Audio file not found: {path}")

        suffix = path.suffix.lower()
        content_type = self.SUPPORTED_CONTENT_TYPES.get(suffix, "audio/mpeg")

        audio_data = path.read_bytes()
        logger.info("Read %d bytes from %s", len(audio_data), path)
        return await self.transcribe(audio_data, content_type=content_type)

    # ── Public sync wrapper ───────────────────────────────────────────────

    def transcribe_sync(
        self,
        audio_data: bytes,
        content_type: str = "audio/mpeg",
    ) -> Dict[str, Any]:
        """
        Synchronous convenience wrapper around :meth:`transcribe`.

        Creates a new event loop if one is not already running.
        """
        return asyncio.run(self.transcribe(audio_data, content_type))
