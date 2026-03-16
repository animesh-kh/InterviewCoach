
I. Selected User Interface 

Chosen UI Type
The software uses:
Menu-Based Interface
Direct Manipulation Interface

These interfaces are suitable for web-based systems where users interact through graphical components such as buttons, forms, and navigation menus.

1. Menu-Based Interface
A menu-based interface allows users to interact with the system by selecting options from a list or navigation menu.

Implementation in the Project:-
In the AI Interview Coach system, a navigation menu is provided in the landing page.
Example (from the Landing component):

<Navbar />
<Hero />
<Features />
<HowItWorks />
<Testimonials />
<Pricing />
<CTA />
<Footer />

How it Works:-
The Navbar component provides menu options.
Users select different sections such as:
Features
Pricing
How It Works

The system scrolls to the selected section.

Example interaction logic:

const section = location.pathname.replace("/", "");
element.scrollIntoView({
  behavior: "smooth",
  block: "start"
});

Advantages:-
Easy navigation
Structured layout
User friendly for beginners

2️⃣ Direct Manipulation Interface
Direct manipulation allows users to interact with graphical components such as buttons, forms, and input fields.

Implementation in the Project

The login page allows users to interact with the system through form fields and buttons.

Example login form:

<input
  type="email"
  placeholder="Email"
/>

<input
  type="password"
  placeholder="Password"
/>

User actions include:
Entering email
Entering password
Clicking Sign In

Example button interaction:
<button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
Sign In
</button>

Advantages:-
Intuitive user interaction
Immediate feedback
Easy to operate

The AI Interview Coach system uses both interfaces because:-
Menu-based UI helps users navigate different sections easily.
Direct manipulation allows users to interact with forms and buttons visually.
These interfaces improve usability and user experience.

II. Implementation of UI Code Components and User Interaction 
The user interface was implemented using:
React.js
HTML
CSS
JavaScript

i- Landing Page Component
Purpose:
Introduces the platform and provides navigation to different sections.

Main components:
Navbar
Hero section
Features section
Testimonials
Pricing
Call-to-Action
Footer

Example code:

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

ii- Login Page Component
Purpose:
Authenticate users before accessing the system.
Main elements:
Email input
Password input
Remember me option
Login button

Example code:

<input
  type="email"
  placeholder="Email"
/>

<input
  type="password"
  placeholder="Password"
/>

User interaction process:
User enters email and password
Clicks SignIn/LogIn
Form submits authentication request
System verifies credentials
User is redirected to the dashboard

iii- User Interaction Flow

User
 ↓
Landing Page
 ↓
Login Page
 ↓
Authentication
 ↓
Dashboard
 ↓
Select Interview Round


iv- System Entry Point

The application starts from index.html
Example:

<!doctype html>
<html lang="en">
<head>
<title>AI Interview Coach</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
