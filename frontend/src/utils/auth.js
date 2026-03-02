export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const loginUser = () => {
  localStorage.setItem("authToken", "dummy-token");
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};
