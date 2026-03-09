CS331 – Software Engineering Lab
Assignment-5

I. Hosting of Application Components

Host Site (Cloud Deployment)
We deploy the system on Render Cloud Platform.

Component	               Hosted On Render	                   Purpose
React Frontend	            Static Site	                User interface
API Gateway (Backend)	     Web Service	          Entry point for all requests
Authentication Service	     Web Service	             Login & JWT generation
Question Generator Service	 Web Service	          Generate interview questions
AI Evaluation Service	    Background Worker	          Evaluate answers
PostgreSQL Database	        Managed Database	         User & interview data
File Storage	              Object Storage	           Audio & reports


Deployment Strategy (Step-by-Step)

1. Repository Integration

Connect GitHub repo to Render
Auto deploy on every push

2. Server Configuration

Runtime: FASTAPI (Backend)
Port: process.env.PORT

Environment variables:

DB_URL
JWT_SECRET
REDIS_URL

3. Backend API Setup

API Gateway exposes REST endpoints
Each microservice registered with internal URL

Example:

/api/auth → Auth Service
/api/questions → Question Service
/api/evaluate → AI Service

4. Database Connection

Backend connects to PostgreSQL using ORM
Redis used for caching sessions

5. Inter-Service Communication

Internal HTTP requests (private network)
JSON based communication

Security Measures:-

Authentication
JWT based authentication

Role-based access control

Network Security
HTTPS enabled by default (TLS encryption)
Private internal service communication
Data Security
Password hashing (bcrypt)
Secure environment variables
Token expiry & refresh tokens

II. End User Access & System Interaction:-

User Access Flow
User opens web application
Login/Register
Receives JWT token
Access interview services

Overall Interaction Diagram:

                USER (Browser)
                     │
                     ▼
            React Frontend (Render)
                     │
                     ▼
               API Gateway
                     │
   ──────────────────────────────────
   │               │               │
Auth Service   Question Service  AI Service
   │               │               │
   └────── PostgreSQL Database ────┘
                     │
                 Redis Cache

Request Flow Example:-

User → Login → Auth Service → JWT Token
User → Start Interview → Question Service
User → Submit Answer → AI Evaluation Service
User → View Report → Database

Final Summary:-

Hosted on Render cloud
Secure JWT authentication
Microservices communicate via APIs
Demonstrated interaction: Auth Service ↔ Question Service
