import axios from "axios";
import { LoginResponse } from "../models/dto/LoginResponse";
import { RefreshTokenResponse } from "../models/dto/RefreshTokenResponse";
import { RegisterResponse } from "../models/dto/RegisterResponse";
import apiClient from "./interceptors";
import { UserInfoResponse } from "../models/dto/UserInfoResponse";
import { Usuario } from "../models/usuario";

export class AuthService {
  login(email: string, password: string): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/crucenoTrip/auth/login/", {
          email,
          password,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error("Error al iniciar sesión: " + error.message));
        });
    });
  }

  refreshToken(): Promise<RefreshTokenResponse> {
    return new Promise<RefreshTokenResponse>((resolve, reject) => {
      const refresh = localStorage.getItem("refreshToken");

      if (!refresh) {
        reject(new Error("No se encontró el refresh token"));
        return;
      }

      axios
        .post("http://127.0.0.1:8000/api/token/refresh/", { refresh })
        .then((response) => {
          const { access } = response.data;
          localStorage.setItem("accessToken", access);
          resolve(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          reject(new Error("Error al refrescar el token: " + error.message));
        });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      apiClient
        .post("auth/logout/")
        .then(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          resolve();
        })
        .catch((error) => {
          reject(new Error("Error al cerrar sesión: " + error.message));
        });
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    telefono: string,
    rol: string
  ): Promise<RegisterResponse> {
    return new Promise<RegisterResponse>((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/crucenoTrip/auth/register/", {
          username,
          email,
          password,
          nombre,
          apellido,
          telefono,
          rol,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error("Error al registrar el usuario: " + error.message));
        });
    });
  }

  me(): Promise<UserInfoResponse> {
    return new Promise<UserInfoResponse>((resolve, reject) => {
      apiClient
        .get("usuarios/me/")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(
            new Error(
              "Error al obtener la información del usuario: " + error.message
            )
          );
        });
    });
  }
  getAllUsers(): Promise<Usuario[]> {
    return new Promise<Usuario[]>((resolve, reject) => {
      apiClient
        .get("usuarios/all/")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error("Error al obtener usuarios: " + error.message));
        });
    });
  }
}
