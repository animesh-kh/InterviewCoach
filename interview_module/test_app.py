import time
import os
import sys

# Ensure the current directory is in the python path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from start_interview import start_interview
from get_question import get_question
from next_question import next_question
from get_result import get_result


def run_full_test():
    # Configuration for the test
    test_id = "interview_test_002"  # Change this if you want a fresh row in Supabase
    role = "Django Developer"
    seniority = "Fresher"
    resume_path = "ABHISHEK_RESUME.pdf"

    print("🚀 STEP 1: Starting Interview & Initializing Supabase Row...")

    try:
        with open(resume_path, "rb") as f:
            resume_bytes = f.read()
    except FileNotFoundError:
        print(f"❌ Error: {resume_path} not found in this directory.")
        return

    # 1. Call Start Interview
    start_res = start_interview(test_id, role, seniority, resume_bytes)

    if start_res.get("status") == "error":
        print(f"❌ Initialization Failed: {start_res['message']}")
        return

    print(f"✅ Row Created! Intro: {start_res['intro']}")

    # Use 'first_question' to match the key in start_interview.py
    current_main_q = start_res.get('first_question')
    last_followup_answer = None

    # 2. Run the Interview Loop (5 Rounds)
    for i in range(1, 6):
        print(f"\n--- ⚡ ROUND {i} OF 5 ---")

        # A. If it's not the first round, we need to fetch the next pre-stored question
        if i > 1:
            # We pass the follow-up answer from the PREVIOUS round to save it
            q_data = get_question(test_id, i, prev_fa=last_followup_answer)
            if q_data["status"] == "success":
                current_main_q = q_data["question"]
            else:
                print(f"❌ Error fetching question {i}: {q_data['message']}")
                break

        print(f"MAIN QUESTION: {current_main_q}")

        # B. Simulate User Answering Main Question
        user_main_ans = f"This is my answer to question {i}. I have experience with this in my projects."
        print(f"USER ANSWER: {user_main_ans}")

        # C. Generate Adaptive AI Follow-up
        next_res = next_question(test_id, i, user_main_ans)
        if next_res["status"] == "success":
            current_fq = next_res["follow_up"]
            print(f"AI FOLLOW-UP: {current_fq}")
        else:
            print(f"❌ Error generating follow-up: {next_res['message']}")
            break

        # D. Simulate User Answering the Follow-up
        last_followup_answer = f"My deep-dive answer to the follow-up of round {i} is based on my internship."
        print(f"USER FOLLOW-UP ANSWER: {last_followup_answer}")

        # Adding a small delay to prevent rate limits and make logs readable
        time.sleep(1.5)

    # 3. Final Step: Evaluation
        # 3. Final Step: Evaluation & Cleanup
    print("\n📊 STEP 3: Fetching Final Result & Cleaning Database...")
    final_res = get_result(test_id, last_followup_answer)

    if final_res["status"] == "success":
        print("\n" + "=" * 50)
        print("                FINAL RESULT                ")
        print("=" * 50)
        # Change these lines to access the keys directly
        print(f"FINAL SCORE: {final_res.get('score')}/100")
        print("-" * 50)
        print(f"FEEDBACK: {final_res.get('feedback')}")
        print("=" * 50)
        print("\n✨ Database row has been deleted. Project cleanup complete.")
    else:
        print(f"❌ Error: {final_res.get('message')}")

if __name__ == "__main__":
    run_full_test()