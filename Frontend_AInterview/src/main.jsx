import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { InterviewProvider } from "./context/InterviewContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <InterviewProvider>
          <App />
        </InterviewProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);