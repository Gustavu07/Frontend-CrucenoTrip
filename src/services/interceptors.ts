import axios from "axios";
import { AuthService } from "./AuthService";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/crucenoTrip/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.error("Error en la solicitud a la API: ", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await new AuthService().refreshToken();
        return apiClient(originalRequest);
      } catch (authError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(authError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
