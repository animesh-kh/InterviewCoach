import { createContext, useContext, useState, useEffect } from "react";
import { getInterviewHistory, getToken } from "../utils/api";

const InterviewContext = createContext();
export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
useEffect(() => {
  const loadInterviews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setInterviews([]);
        return;
      }
      const data = await getInterviewHistory();
      const list = Array.isArray(data?.interviews) ? data.interviews : [];
      // Map backend DB fields to frontend-expected field names
      const mapped = list.map((item) => ({
        id: item.id,
        roundType: item.job_role || "Interview",
        date: item.created_at,
        score: item.overall_score ?? 0,
        feedback: item.ai_feedback || "",
        duration: item.duration || 15,
        status: item.overall_score != null ? "completed" : "in-progress",
      }));
      setInterviews(mapped);
    } catch (error) {
      console.error("Failed to load interviews:", error);
      setInterviews([]);
    }
  };
  loadInterviews();
  }, []);
  const addInterview = (interview) => {
    setInterviews((prev) => [interview, ...prev]);
  };
  return (
    <InterviewContext.Provider value={{ interviews, addInterview }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  return useContext(InterviewContext);
};