from interview_engine import InterviewEngine
import json

def run_backend_simulation():
    # 1. Initialize the engine (Your backend will do this on startup)
    print("Initializing Interview Engine...")
    engine = InterviewEngine()

    # 2. Mocking data simulating what the backend fetches from Supabase
    field = "Machine Learning"
    level = "Entry"
    chat_history = [
        {
            "q": "Can you explain the difference between supervised and unsupervised learning?", 
            "a": "Supervised learning uses labeled datasets to train algorithms to classify data or predict outcomes accurately. Unsupervised learning uses machine learning algorithms to analyze and cluster unlabeled datasets."
        }
    ]

    # 3. Requesting the next question (Turn 2 -> Groq Follow-up)
    print("\n--- Requesting Next Question ---")
    response = engine.generate_question(field, level, chat_history)
    
    if response["status"] == "success":
        print(f"Turn Number: {response['turn_number']}")
        print(f"AI Question Generated: {response['question']}")
    else:
        print(f"Error Message for User: {response['message']}")

    # 4. Requesting Final Evaluation (Gemini JSON Evaluation)
    print("\n--- Requesting Final Evaluation ---")
    eval_response = engine.evaluate_interview(field, level, chat_history)
    
    if eval_response["status"] == "success":
        print("Evaluation Data Received Successfully:")
        print(json.dumps(eval_response["evaluation"], indent=2))
    else:
        print(f"Error: {eval_response['message']}")

if __name__ == "__main__":
    run_backend_simulation()
