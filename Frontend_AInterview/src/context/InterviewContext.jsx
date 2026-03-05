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
      if (Array.isArray(data)) {
        setInterviews(data);
      }
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