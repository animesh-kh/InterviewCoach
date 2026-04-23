"""
Speech-to-Text Module
---------------------
Transcribes audio to text using the Cloudflare Workers AI API.

Usage:
    from stt.cloudflare_stt import CloudflareSTT

    stt = CloudflareSTT()
    transcript = await stt.transcribe(audio_bytes)
"""

from .cloudflare_stt import CloudflareSTT

__all__ = ["CloudflareSTT"]
