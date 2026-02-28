CS331 – Software Engineering Lab
Assignment-4

Project Chosen: AI Interview Coach System

I. Selected Software Architecture Style
Microservices Architecture

The system is divided into multiple small independent services where each service performs a single business function and communicates using APIs (HTTP/REST).

A. Justification based on Component Granularity

Granularity = how big or small each module/service is

In our project, each service handles only one responsibility → Fine-grained services.

Service	Responsibility	Granularity Level
Authentication Service	Login/Register	Small
Resume Analysis Service	Parse & analyze resume	Small
Question Generation Service	Generate interview questions	Small
AI Evaluation Service	Analyze answers	Small
Speech Processing Service	Speech-to-text & text-to-speech	Small
Feedback Service	Generate feedback & score	Small
Report Service	Generate performance report	Small
Why it is Microservices

Each module runs independently
Each has its own logic & API
Can be deployed separately
Failure in one service does NOT crash whole system

Simple Architecture Diagram
                ┌──────────────┐
                │   Frontend   │
                │ (React App)  │
                └──────┬───────┘
                       │ API Gateway
        ───────────────────────────────────
        │        │        │        │       │
 Auth  Resume  Question  AI Eval  Speech  Report
Service Service Service  Service  Service Service
        │        │        │        │       │
                 └────── Database ────────┘

B. Why Microservices is Best Choice
1. Scalability

Only heavy modules scaled (AI evaluation, speech processing)
Saves server cost
Handles multiple students simultaneously

Example:
During placement season → only AI evaluation service load increases → scale only that service.

2. Maintainability

Each module independent
Easy debugging
New feature added without affecting others

Example:
Adding new emotion-analysis → update only AI Evaluation Service.

3. Performance

Parallel execution of services
Faster response time
Load balancing possible

4. Fault Tolerance

If speech service fails → text interview still works
Whole system does not crash

5. Technology Flexibility

Different technologies can be used:
Python → AI Models
FASTAPIs → Backend APIs
React → Frontend

Conclusion

Microservices fits because system contains multiple independent AI functionalities that must scale and evolve separately.

II. Components of the Software System
1. Client Side Components (Frontend)

User Interface (Dashboard)
Interview Screen
Video/Audio Recorder
Result & Analytics Page
Profile & History Page

2. Backend Application Components
Core Services

Authentication Service
User Profile Service
Session Management Service
AI Services
Resume Analyzer
Question Generator
Answer Evaluation Engine
Emotion Detection
Speech-to-Text Engine
Text-to-Speech Engine
Data Services
Feedback Generator
Scoring Engine
Report Generator

3. Storage Components

User Database
Interview Recordings Storage
Result/Report Database
Logs Database

4. External Integrations

AI/ML Model APIs
Speech Recognition API
Email Notification Service

Overall Component Interaction
User → Frontend → API Gateway → Microservices → Database
                                  ↓
                           AI Processing Engines
                                  ↓
                              Feedback
                                  ↓
                               Report

Final Summary

Architecture Used: Microservices
Reason: Independent AI modules, scalable, maintainable, fault-tolerant
Components: Frontend UI + Multiple backend services + AI engines + Databases + External API