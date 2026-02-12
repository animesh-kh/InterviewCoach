import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleInterviewClick = () => {
    navigate("/interview");
  };

  return (
    <>
      <section className="hero">
        <p className="hero-tag">AI INTERVIEW COACH</p>
        <h1 className="hero-title">
          Land your <span className="gradient-text">Dream Job</span>
        </h1>
        <p className="hero-subtitle">
          The ultimate AI interview coach that listens, analyzes, and prepares<br></br>
          &nbsp;&nbsp;<br></br>
          you for technical and behavioral questions in real-time.
        </p>
        <button
          className="primary-btn"
          onClick={handleInterviewClick}
        >
          Try AI Interview
        </button>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Resume Analysis</h3>
            <p>
              Get score and actionable suggestions based on job market trends.
            </p>
          </div>

          <div className="feature-card">
            <h3>Company-Specific</h3>
            <p>
              Practice rounds designed for Google, Amazon, and top startups.
            </p>
          </div>

          <div className="feature-card">
            <h3>Technical Mock</h3>
            <p>
              Challenge your coding and system design skills with live feedback.
            </p>
          </div>

          <div className="feature-card">
            <h3>Skill Scorecards</h3>
            <p>
              Visualize your strengths and focus on areas needing improvement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
