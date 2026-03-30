Core Functional Modules in our AI Interview System

Below are the main BLL modules you should implement:

1️.Candidate Management Module
Handles candidate-related operations such as:

Registration
Login authentication
Profile management

Business Logic:-
Validate user credentials
Ensure unique email/username
Maintain session state

Interaction with UI:-
UI Component	         BLL Function
Registration Form	   registerCandidate()
Login Page	           authenticateCandidate()


2️.Question Generation Module (AI-Based)
Generates interview questions based on:

Role (e.g., Software Engineer)
Difficulty level
Skills selected

Business Logic:-
Map role → question bank / AI prompt
Randomization or adaptive difficulty
Avoid repeated questions

Interaction with UI:-
UI Component	BLL Function
Start Interview Button	generateQuestions(role, level)

3️. Interview Session Management Module
Controls the flow of interview sessions.

Business Logic:-
Start/stop interview
Track current question
Timer management
Store responses temporarily

Interaction with UI:-
UI Component	        BLL Function
Interview Screen	    startSession()
Next Button	            getNextQuestion()
Submit Answer	        saveResponse()

4️.Answer Evaluation Module (Core AI Logic)
Evaluates candidate answers using:
NLP techniques OR
Keyword matching 


Business Logic:-
Compare answer with expected answer
Score based on relevance, correctness
Handle subjective answers

Interaction with UI:-
UI Component	           BLL Function
Submit Answer Button	evaluateAnswer(answer)

5️.Scoring & Feedback Module
Generates final results and feedback.

Business Logic:-
Aggregate scores
Calculate percentage
Generate feedback (strengths/weaknesses)

Interaction with UI:-
UI Component	        BLL Function
Result Page	            calculateScore()
Feedback Section	    generateFeedback()


6.Report Generation Module
Creates structured reports for candidates.

Business Logic:-
Compile answers + scores
Generate PDF/JSON report
Store history


Interaction with UI:- 
UI Component	           BLL Function
Download Report Button	   generateReport()

Example Flow (End-to-End):-
User clicks Start Interview (UI)
→ startSession() (BLL)
→ generateQuestions() (BLL)
→ Questions shown on UI
User submits answer
→ evaluateAnswer() (BLL)
→ Score stored in DB
After completion
→ calculateScore() + generateFeedback()
→ Results displayed on UI


Module-wise Business Rules
1️.Candidate Management Module
Controls user authentication and profile handling.

Business Rules:-
Email/username must be unique
Password must meet minimum security criteria
Only registered users can log in
Session timeout after inactivity

Implementation Logic:-
if(userExists(email)) {
    throw new Exception("User already exists");
}

if(password.length() < 6) {
    throw new Exception("Weak password");
}

2. Question Generation Module
Generates interview questions dynamically.

Business Rules:-
Questions must match selected role (e.g., SDE, Data Analyst)
Difficulty level must follow user selection
No duplicate questions in a session
Limit number of questions (e.g., 10 per interview)

Implementation Logic:-
Set<String> selectedQuestions = new HashSet<>();
while(selectedQuestions.size() < 10) {
    String q = getRandomQuestion(role, level);
    selectedQuestions.add(q);
}


3.Interview Session Management Module
Controls interview flow and timing.

Business Rules:-
Interview must start only after successful login
Each question has a time limit
User cannot go back to previous questions
Session auto-ends after time expires

Implementation Logic:-
if(!isLoggedIn(user)) {
    throw new Exception("Unauthorized access");
}

if(timeExceeded()) {
    endInterview();
}


4.Answer Evaluation Module
Evaluates user answers using AI/NLP.

Business Rules:-
Exact match → full score
Partial match → partial score
Empty answer → zero score
Use keyword or semantic similarity


5️.Scoring & Feedback Module
Calculates final results and generates feedback.

Business Rules:-
Total score = sum of all question scores
Performance categories:
80–100 → Excellent
50–79 → Good
<50 → Needs Improvement
Feedback must reflect weak areas

Implementation Logic:-
if(score >= 80) feedback = "Excellent";
else if(score >= 50) feedback = "Good";
else feedback = "Needs Improvement";


6.Report Generation Module
Generates final report for the candidate.

Business Rules:-
Report generated only after interview completion
Must include:
Questions
Answers
Scores
Stored for future access

Implementation Logic:-
if(!interviewCompleted) {
    throw new Exception("Interview not completed");
}
generateReport(userResponses);



Where Validation is Implemented (Module-wise)


1.Candidate Registration Validation
Ensures only valid users are registered.

Validation Rules:-
Email must follow proper format (abc@gmail.com)
Password must have:
Minimum length (e.g., 6 characters)
At least one number or special character
Required fields must not be empty



2️.Login Validation:-
Prevents unauthorized access.

Validation Rules:-

User must exist in database
Password must match stored password
Prevent empty inputs

3️.Question Input / Selection Validation
Ensures valid interview configuration.

Validation Rules:-
Role must be selected
Difficulty must be valid (Easy/Medium/Hard)
Number of questions within limit

4️.Answer Submission Validation
Ensures meaningful answers are evaluated.

Validation Rules:-
Answer should not be empty
Length constraints (avoid too short/irrelevant answers)
Prevent multiple submissions for same question

5️.Session Validation
Maintains proper interview flow.

Validation Rules:-
User must be logged in
Session must be active
Time constraints enforced

Types of Validation Used
 1. Client-Side Validation (UI)
Immediate feedback (e.g., form validation)
Example: checking empty fields before submission
 2. Server-Side Validation (BLL)
Ensures security and correctness
Cannot be bypassed by user

🔹 Where Data Transformation is Used::--

Candidate Data Transformation:-
Database stores raw candidate details, but UI needs formatted data.

Transformation Rules
Combine fields (first name + last name → full name)
Hide sensitive data (password not sent to UI)
Format timestamps


2️.Question Data Transformation
Questions in DB may contain metadata, but UI needs clean text.

Transformation Rules:-
Remove internal fields (IDs, difficulty codes)
Convert structured data → display format
Shuffle options for MCQs

3️.Answer & Evaluation Data Transformation
Evaluation results must be user-friendly.

Transformation Rules:-
Convert numeric score → percentage
Map score → performance level
Add readable feedback

4️.Interview Result Transformation
Database stores raw scores, UI needs structured report.

Transformation Rules:-
Aggregate scores
Convert into summary format
Add visual-friendly fields
