import asyncio
from tts import CloudflareTTS


async def main():
    tts = CloudflareTTS()
    audio = await tts.synthesize("Hello, this is a test of text to speech.")

    with open("test_output.mp3", "wb") as f:
        f.write(audio)

    print(f"✅ Audio saved! ({len(audio)} bytes) → test_output.mp3")


asyncio.run(main())
