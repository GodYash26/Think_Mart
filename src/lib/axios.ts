import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const publicPaths = ["/", "/login-form", "/products"];
      const isPublicPath = publicPaths.some(path => currentPath === path || currentPath.startsWith(path));
      
      if (!isPublicPath && currentPath !== "/login-form") {
        window.location.href = "/login-form";
      }
    }

    // Extract error message
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
