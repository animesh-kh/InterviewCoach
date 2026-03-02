import { useNavigate } from "react-router-dom";
import "./ChooseAuth.css";

function ChooseAuth() {
  const navigate = useNavigate();

  return (
    <div className="auth-choice-page">
      <div className="auth-choice-card">
        <h2>Get Started with AI Interview Coach</h2>
        <p>Choose how you want to continue</p>

        <div className="auth-choice-buttons">
          <button
            className="auth-btn primary"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </button>

          <button
            className="auth-btn secondary"
            onClick={() => navigate("/signup")}
          >
            I’m new here
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseAuth;
