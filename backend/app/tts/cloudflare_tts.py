"""
Cloudflare Text-to-Speech Service
----------------------------------
Wraps the Cloudflare Workers AI TTS REST API into a clean,
class-based interface.

Usage:
    from tts.cloudflare_tts import CloudflareTTS

    tts = CloudflareTTS()

    # Async usage (recommended inside FastAPI endpoints)
    audio_bytes = await tts.synthesize("Hello world!")

    # Synchronous convenience wrapper
    audio_bytes = tts.synthesize_sync("Hello world!")
"""

from __future__ import annotations

import asyncio
import logging
from pathlib import Path
from typing import Optional

import httpx

from .tts_config import TTSConfig

logger = logging.getLogger(__name__)


class CloudflareTTSError(Exception):
    """Raised when the Cloudflare TTS API returns an error."""


class CloudflareTTS:
    """
    Text-to-Speech client for the Cloudflare Workers AI API.

    Parameters
    ----------
    account_id : str, optional
        Override the account ID from the environment.
    api_token : str, optional
        Override the API token from the environment.
    model : str, optional
        Override the TTS model (default: ``@cf/deepgram/aura-1``).
    timeout : float
        HTTP request timeout in seconds (default: 30).
    """

    def __init__(
        self,
        account_id: Optional[str] = None,
        api_token: Optional[str] = None,
        model: Optional[str] = None,
        timeout: float = 30.0,
    ) -> None:
        # Allow constructor overrides; fall back to env vars
        self._account_id = account_id or TTSConfig.CLOUDFLARE_ACCOUNT_ID
        self._api_token = api_token or TTSConfig.CLOUDFLARE_API_TOKEN
        self._model = model or TTSConfig.CLOUDFLARE_TTS_MODEL
        self._timeout = timeout

        # Validate that we have the required credentials
        if not self._account_id or not self._api_token:
            TTSConfig.validate()  # raises EnvironmentError with details

        self._url = TTSConfig.BASE_URL.format(
            account_id=self._account_id, model=self._model
        )
        self._headers = {
            "Authorization": f"Bearer {self._api_token}",
            "Content-Type": "application/json",
        }

    # ── Public async API ──────────────────────────────────────────────────

    async def synthesize(self, text: str) -> bytes:
        """
        Convert *text* to speech and return raw audio bytes.

        Parameters
        ----------
        text : str
            The text to convert to speech.

        Returns
        -------
        bytes
            Raw audio data (typically MP3).

        Raises
        ------
        CloudflareTTSError
            If the API returns a non-200 status or an error payload.
        ValueError
            If *text* is empty.
        """
        if not text or not text.strip():
            raise ValueError("Text must not be empty.")

        payload = {"text": text}

        async with httpx.AsyncClient(timeout=self._timeout) as client:
            logger.info("Requesting TTS from Cloudflare (%d chars)", len(text))
            response = await client.post(
                self._url, headers=self._headers, json=payload
            )

        if response.status_code != 200:
            error_detail = response.text
            logger.error(
                "Cloudflare TTS API error %s: %s",
                response.status_code,
                error_detail,
            )
            raise CloudflareTTSError(
                f"Cloudflare API returned {response.status_code}: {error_detail}"
            )

        logger.info(
            "TTS audio received (%d bytes)", len(response.content)
        )
        return response.content

    # ── Public sync wrapper ───────────────────────────────────────────────

    def synthesize_sync(self, text: str) -> bytes:
        """
        Synchronous convenience wrapper around :meth:`synthesize`.

        Creates a new event loop if one is not already running.
        """
        return asyncio.run(self.synthesize(text))

    # ── File helper ───────────────────────────────────────────────────────

    async def synthesize_to_file(
        self, text: str, output_path: str | Path
    ) -> Path:
        """
        Convert *text* to speech and write the audio to *output_path*.

        Returns the resolved :class:`~pathlib.Path` of the written file.
        """
        audio_bytes = await self.synthesize(text)
        out = Path(output_path)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(audio_bytes)
        logger.info("Audio saved to %s", out)
        return out
