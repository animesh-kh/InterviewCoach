import os
import json
from google import genai
from google.genai import types
from groq import Groq
from dotenv import load_dotenv

# Load environment variables securely from the .env file
load_dotenv()


class InterviewEngine:
    def __init__(self):
        """Initializes the API clients for Gemini and Groq."""
        # Setup Gemini (Using the new SDK)
        self.gemini_client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        self.gemini_model_name = 'gemini-2.5-flash'  # Upgraded model

        # Setup Groq
        self.groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        self.groq_model = "llama3-8b-8192"

    def _clean_and_validate_question(self, text):
        """Sanitizes AI output and ensures it meets quality standards."""
        if not text or not isinstance(text, str):
            raise ValueError("AI returned an empty or invalid response.")

        clean_text = text.strip()
        prefixes_to_remove = [
            "Question:", "Follow-up:", "Follow up:", "Here is a question:",
            "Sure,", "Okay,", "Here is a follow-up question:"
        ]

        for prefix in prefixes_to_remove:
            if clean_text.lower().startswith(prefix.lower()):
                clean_text = clean_text[len(prefix):].strip()

        if len(clean_text) < 15:
            raise ValueError(f"Generated question is too short: '{clean_text}'")

        if len(clean_text) > 800:
            raise ValueError("Generated question exceeded maximum expected length.")

        return clean_text

    def _call_gemini_for_new_topic(self, field, level, chat_history):
        """Calls Gemini for a broad, new technical topic."""
        past_questions = [item['q'] for item in chat_history]

        prompt = f"""You are a strict interview question generator API. Your ONLY purpose is to output a single, raw string containing a technical interview question.

        RULES:
        1. NO CONVERSATIONAL FILLER. Do not say "Here is a question" or "Sure".
        2. NO GREETINGS OR SIGN-OFFS.
        3. NO MULTIPLE CHOICE. Ask an open-ended question.
        4. DO NOT REPEAT PAST TOPICS.

        CONTEXT:
        Role: {level} {field}
        Past questions to avoid: {past_questions}

        OUTPUT YOUR QUESTION BELOW THIS LINE AND NOTHING ELSE:
        """

        # New SDK syntax for generation
        response = self.gemini_client.models.generate_content(
            model=self.gemini_model_name,
            contents=prompt
        )
        return self._clean_and_validate_question(response.text)

    def _call_groq_for_followup(self, chat_history):
        """Calls Groq for a rapid follow-up based on the candidate's last answer."""
        last_exchange = chat_history[-1]

        messages = [
            {
                "role": "system",
                "content": """You are a strict interview API. Your job is to generate a single follow-up question to test the candidate's depth of knowledge based on their last answer. 

                STRICT RULES:
                - DO NOT acknowledge the candidate's answer.
                - DO NOT say "Good job", "Interesting", or "That is correct."
                - DO NOT say "Here is a follow-up."
                - Output ONLY the raw text of the question."""
            },
            {
                "role": "user",
                "content": f"""Original Question: "{last_exchange['q']}"
                Candidate's Answer: "{last_exchange['a']}"

                Generate the follow-up question now:"""
            }
        ]

        chat_completion = self.groq_client.chat.completions.create(
            messages=messages,
            model=self.groq_model,
            max_tokens=150,
            temperature=0.7
        )

        return self._clean_and_validate_question(chat_completion.choices[0].message.content)

    def generate_question(self, field, level, chat_history):
        """Main routing method to generate the next question."""
        try:
            current_turn = len(chat_history) + 1

            if current_turn > 10:
                return {
                    "status": "completed",
                    "message": "Interview limit reached. Ready for evaluation.",
                    "is_interview_over": True
                }

            if current_turn % 2 != 0:
                question = self._call_gemini_for_new_topic(field, level, chat_history)
            else:
                question = self._call_groq_for_followup(chat_history)

            return {
                "status": "success",
                "question": question,
                "is_interview_over": False,
                "turn_number": current_turn
            }

        except Exception as e:
            print(f"Engine Error: {e}")
            return {
                "status": "error",
                "message": "I apologize, but we are experiencing technical difficulties. We will have to end this session here.",
                "is_interview_over": True
            }

    def evaluate_interview(self, field, level, chat_history):
        """Evaluates the entire interview transcript using Gemini JSON mode."""
        try:
            prompt = f"""
            You are an expert technical recruiter evaluating a {level} {field} candidate.
            Review the following interview transcript:
            {chat_history}

            Return a strictly formatted JSON object with the following keys:
            - "technical_score": (integer 1-10)
            - "technical_feedback": (string paragraph)
            - "grammar_and_communication": (string paragraph)
            - "verbosity_analysis": (string paragraph analyzing if they over/under explained)
            - "actionable_advice": (array of 3 string bullet points)
            """

            # New SDK syntax for structured JSON output
            response = self.gemini_client.models.generate_content(
                model=self.gemini_model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                )
            )

            evaluation_data = json.loads(response.text)

            return {
                "status": "success",
                "evaluation": evaluation_data
            }

        except Exception as e:
            print(f"Evaluation Error: {e}")
            return {
                "status": "error",
                "message": "Could not evaluate the interview due to a technical error."
            }