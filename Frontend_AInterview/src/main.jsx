import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { InterviewProvider } from "./context/InterviewContext";

const PUBLISHABLE_KEY = "pk_test_bmVhdC10dXJrZXktODUuY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <InterviewProvider>
          <App />
        </InterviewProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);