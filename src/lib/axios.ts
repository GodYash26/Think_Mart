import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise: Promise<unknown> | null = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${baseURL}/auth/refresh`, {}, { withCredentials: true })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const shouldTryRefresh = (config?: RetryableRequestConfig) => {
  if (!config?.url) return false;

  return ![
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/logout",
  ].some((path) => config.url?.includes(path));
};

const isPublicEndpoint = (url?: string) => {
  if (!url) return false;
  
  const publicEndpoints = [
    "/products",
    "/categories",
  ];

  return publicEndpoints.some((endpoint) => url.includes(endpoint));
};

const redirectToHomeIfProtectedPath = () => {
  const currentPath = window.location.pathname;
  const isPublicPath =
    currentPath === "/" ||
    currentPath === "/login" ||
    currentPath === "/register" ||
    currentPath === "/products" ||
    currentPath.startsWith("/products/");

  if (!isPublicPath) {
    window.location.href = "/";
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      shouldTryRefresh(originalRequest) &&
      !isPublicEndpoint(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return apiClient(originalRequest);
      } catch {
        redirectToHomeIfProtectedPath();
      }
    }

    if (error.response?.status === 401) {
      if (!isPublicEndpoint(originalRequest?.url)) {
        redirectToHomeIfProtectedPath();
      }
    }

    const errorMessage =
      (error.response?.data as { message?: string } | undefined)?.message ||
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
