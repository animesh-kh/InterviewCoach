const API_BASE = "http://127.0.0.1:8000";

export const signin = async (credentials) => {
  const response = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  return data;
};

export const signup = async (userData) => {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const signout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const uploadResume = async (file) => {
  const token = getToken();

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/resumes/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};

export const getMyResumes = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/resumes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getResume = async (id) => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/resumes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const startInterview = async (data) => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/interviews/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const saveInterview = async (data) => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/interviews/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getInterviewHistory = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/interviews/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getInterview = async (id) => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/interviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};