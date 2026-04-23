"""
TTS → STT Round-trip Test
-------------------------
1. Converts a text string to speech using CloudflareTTS.
2. Feeds the generated audio into CloudflareSTT.
3. Prints the transcribed text so you can verify it matches the original.
"""

import asyncio
from tts import CloudflareTTS
from stt import CloudflareSTT


async def main():
    original_text = "Hello, this is a test of the interview coach application."

    # ── Step 1: Text → Speech ─────────────────────────────────────────
    print(f"📝 Original text : {original_text}")
    print("🔊 Converting text to speech ...")

    tts = CloudflareTTS()
    audio_bytes = await tts.synthesize(original_text)
    print(f"✅ TTS done — received {len(audio_bytes)} bytes of audio\n")

    # ── Step 2: Speech → Text ─────────────────────────────────────────
    print("🎤 Transcribing audio back to text ...")

    stt = CloudflareSTT()
    result = await stt.transcribe(audio_bytes, content_type="audio/mpeg")

    transcribed_text = result.get("text", result)
    print(f"✅ STT done — transcribed text: {transcribed_text}\n")

    # ── Compare ───────────────────────────────────────────────────────
    print("━" * 50)
    print(f"  Original    : {original_text}")
    print(f"  Transcribed : {transcribed_text}")
    print("━" * 50)


if __name__ == "__main__":
    asyncio.run(main())
