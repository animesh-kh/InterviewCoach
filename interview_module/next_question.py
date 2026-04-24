import json
from config import groq_client, supabase

def next_question(interview_id, question_number, main_answer):
    try:
        slot_key = f"slot_{question_number}"
        res = supabase.table("interviews").select(f"{slot_key}, context_summary").eq("interview_id", interview_id).single().execute()
        slot_data = res.data[slot_key]

        prompt = f"Context: {res.data['context_summary']}\nQ: {slot_data['q']}\nA: {main_answer}\nAsk one technical follow-up."
        ai_res = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        fq = ai_res.choices[0].message.content.strip()
        slot_data.update({"a": main_answer, "fq": fq})
        supabase.table("interviews").update({slot_key: slot_data}).eq("interview_id", interview_id).execute()

        return {"status": "success", "follow_up": fq}
    except Exception as e:
        return {"status": "error", "message": str(e)}