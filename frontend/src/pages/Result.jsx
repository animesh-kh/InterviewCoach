import { useContext } from "react";
import { InterviewContext } from "../context/AuthContext";

function Result() {
  const { answers } = useContext(InterviewContext);

  return (
    <div>
      <h2>Interview Completed</h2>
      <p>Answered {answers.length} questions</p>
      <p>AI evaluation will be added in backend</p>
    </div>
  );
}

export default Result;
