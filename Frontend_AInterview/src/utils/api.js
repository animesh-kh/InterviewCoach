import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";
export const API_BASE = import.meta.env.VITE_API_BASE||"https://interviewcoach-production-ad2b.up.railway.app";
console.log("API_BASE =", API_BASE);
const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signin = async (credentials) => {
  const response = await api.post("/auth/signin", credentials);
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const signout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// ── Interview Flow Endpoints ──────────────────────────────────────────────

export const startInterviewSession = async (resumeFile, jobRole, seniority) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_role", jobRole);
  formData.append("seniority", seniority);

  const response = await api.post("/interviews/start", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const submitFollowUp = async (
  interviewId,
  questionNumber,
  answerType,
  answerText,
  answerAudio
) => {
  const formData = new FormData();
  formData.append("interview_id", interviewId);
  formData.append("question_number", questionNumber);
  formData.append("answer_type", answerType);
  if (answerText) formData.append("answer_text", answerText);
  if (answerAudio) formData.append("answer_audio", answerAudio);

  const response = await api.post("/interviews/get-follow-up", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getNextQuestion = async (
  interviewId,
  questionNumber,
  answerType,
  answerText,
  answerAudio
) => {
  const formData = new FormData();
  formData.append("interview_id", interviewId);
  formData.append("question_number", questionNumber); // This is the NEXT question number
  formData.append("answer_type", answerType);
  if (answerText) formData.append("answer_text", answerText);
  if (answerAudio) formData.append("answer_audio", answerAudio);

  const response = await api.post("/interviews/get-next-question", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const endInterviewSession = async (
  interviewId,
  answerType,
  answerText,
  answerAudio
) => {
  const formData = new FormData();
  formData.append("interview_id", interviewId);
  formData.append("answer_type", answerType);
  if (answerText) formData.append("answer_text", answerText);
  if (answerAudio) formData.append("answer_audio", answerAudio);

  const response = await api.post("/interviews/end", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await api.get("/interviews/");
  return response.data;
};

export const getInterview = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

export const uploadResume = async (file, role, experience) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("role", role);
  formData.append("experience", experience);
  const response = await api.post("/resumes/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyResumes = async () => {
  const response = await api.get("/resumes/");
  return response.data;
};

export const getResumeInfo = async (id) => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const callSTT = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.text;
};
window.onerror = function (msg, src, line, col, err) {
  console.log("GLOBAL ERROR:", msg, err);
};
export const callTTS = async (text) => {
  const response = await api.post("/tts", { text }, { responseType: "blob" });
  return URL.createObjectURL(response.data);
};