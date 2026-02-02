Functional Requirements Document (FRD)

Project Title

AI Interview & Resume Screening Agent
A smart, interactive system for interview preparation and resume evaluation

1. Overview

1.1 Purpose

This document defines the functional requirements for the **AI Interview & Resume Screening Agent**, a web-based platform that helps users practice interviews and improve their resumes using AI-driven feedback.

 1.2 Scope

The system will allow users to upload resumes, receive AI-based screening and feedback, simulate interviews (technical, HR, and resume-based), and track their progress over time.

1.3 Intended Audience
Students and fresh graduates
Working professionals
(Future scope) Training institutes

2. Stakeholders

 Stakeholder       Description                                          
 End Users         Students, freshers, professionals using the platform 
 Product Owner     Defines product vision and priorities                
 Development Team  Builds and maintains the system                      
 QA Team           Tests functionality and performance                  
 AI Team           Builds resume analysis and interview models          


3. User Roles

 Role                Description                                       
 Guest               Can view landing page and sign up                 
 Registered User     Can upload resume, take interviews, view feedback 
 Admin (Future)      Manages users, content, and system settings       
 Recruiter (Future)  Screens resumes only                              


4. Functional Requirements

4.1 User Authentication & Profile Management

(i) The system shall allow users to sign up using email and OAuth (Google, GitHub).
(ii) The system shall allow users to log in securely using credentials.
(iii) The system shall allow users to create a profile with name, experience level, target role, and years of experience.
(iv) The system shall allow users to update and persist profile information.


4.2 Resume Upload & Parsing

(v) The system shall allow users to upload resumes in PDF or DOCX format.
(vi) The system shall validate file size and format before upload.
(vii) The system shall extract skills, education, experience, and projects from the resume.
(viii) The system shall securely store parsed resume data.


4.3 AI Resume Screening & Feedback

(ix) The system shall score resumes based on the selected target role.
(x) The system shall provide section-wise feedback (skills, projects, experience).
(xi) The system shall analyze ATS compatibility.
(xii) The system shall detect missing or weak keywords and suggest improvements.


4.4 AI Interview Simulation

(xiii) The system shall support Technical, HR/Behavioral, and Resume-based interview modes.
(xiv) The system shall generate questions dynamically based on resume and target role.
(xv) The system shall ask context-aware follow-up questions.
(xvi) The system shall provide a chat-based interactive interview interface.


4.5 Interview Evaluation & Feedback

(xvii) The system shall evaluate answers for technical correctness, clarity, and depth.
(xviii) The system shall provide per-question scores.
(xix) The system shall summarize strengths and weaknesses.
(xx) The system shall show sample ideal answers for learning.


4.6 User Progress Dashboard

(xxi) The system shall display interview history.
(xxii) The system shall show performance trends over time.
(xxiii) The system shall identify weak areas.
(xxiv) The system shall provide personalized improvement recommendations.

5. Non-Functional Requirements

5.1 Performance

1. Resume analysis response time shall be less than 5 seconds.
2. Interview response latency shall be less than 2 seconds.

5.2 Security

3. User data and resumes shall be encrypted.
4. The system shall implement secure authentication and authorization.
5. The system shall not share user data without consent.

5.3 Scalability & Availability

6. The system shall support multiple concurrent users.
7. The backend shall be stateless and horizontally scalable.

5.4 Usability

8. The UI shall be clean and intuitive.
9. The system shall be usable on mobile and desktop devices.

