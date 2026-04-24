from config import supabase

def get_question(interview_id, question_number, prev_fa=None):
    try:
        # Save previous follow-up answer if it exists
        if prev_fa and question_number > 1:
            prev_key = f"slot_{question_number-1}"
            data = supabase.table("interviews").select(prev_key).eq("interview_id", interview_id).single().execute().data[prev_key]
            data["fa"] = prev_fa
            supabase.table("interviews").update({prev_key: data}).eq("interview_id", interview_id).execute()

        # Fetch current main question
        curr_key = f"slot_{question_number}"
        res = supabase.table("interviews").select(curr_key).eq("interview_id", interview_id).single().execute()
        return {"status": "success", "question": res.data[curr_key]["q"]}
    except Exception as e:
        return {"status": "error", "message": str(e)}