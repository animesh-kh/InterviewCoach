import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);

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