"""
Text-to-Speech Module
---------------------
Converts text to speech audio using the Cloudflare Workers AI API.

Usage:
    from tts.cloudflare_tts import CloudflareTTS

    tts = CloudflareTTS()
    audio_bytes = await tts.synthesize("Hello, how are you?")
"""

from .cloudflare_tts import CloudflareTTS

__all__ = ["CloudflareTTS"]
