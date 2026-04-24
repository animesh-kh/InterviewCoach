import json
from config import groq_client, supabase


def get_result(interview_id, last_followup_answer):
    try:
        # 1. Fetch the entire row one last time to get the transcript
        # We also include the final follow-up answer in our local transcript
        res = supabase.table("interviews").select("*").eq("interview_id", interview_id).single().execute()

        if not res.data:
            return {"status": "error", "message": "Interview record not found."}

        interview_data = res.data

        # 2. DELETE the row immediately (Cleanup)
        supabase.table("interviews").delete().eq("interview_id", interview_id).execute()
        print(f"🗑️ Record {interview_id} deleted from database.")

        # 3. Format the transcript for Groq
        transcript = ""
        for i in range(1, 6):
            slot = interview_data[f"slot_{i}"]
            # Use the actual saved answer, or the 'last_followup_answer' if it's slot 5
            fa = last_followup_answer if i == 5 else slot.get('fa')

            transcript += f"""
            Q{i}: {slot['q']}
            A{i}: {slot['a']}
            Follow-up Q: {slot['fq']}
            Follow-up A: {fa}
            """

        # 4. Generate the Final Evaluation
        evaluation_prompt = f"""
        Analyze this interview transcript:
        {transcript}

        Provide:
        1. A score out of 100.
        2. Professional feedback (strictly under 100 words).

        Return ONLY a JSON object with keys: "score" and "feedback".
        """

        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a concise technical recruiter. Output JSON only."},
                {"role": "user", "content": evaluation_prompt}
            ],
            response_format={"type": "json_object"}
        )

        result_data = json.loads(response.choices[0].message.content)

        # 5. Return the result directly
        return {
            "status": "success",
            "score": result_data.get("score"),
            "feedback": result_data.get("feedback")
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}