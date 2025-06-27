import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, logoutUser } from "../redux/slices/authSlice";
import { AuthService } from "../services/AuthService";

type LoginParams = {
  access_token: string;
  refresh_token: string;
  email: string;
  isAdmin: boolean;
  rol: "usuario" | "guia" | "admin";
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const rol = useAppSelector((state) => state.auth.rol);

  const doLogin = (params: LoginParams) => {
    dispatch(
      loginUser({
        email: params.email,
        isAdmin: params.isAdmin,
        rol: params.rol,
      })
    );
  };

  const doLogout = () => {
    new AuthService()
      .logout()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    new AuthService()
      .me()
      .then((response) => {
        const user = response.user;
        const perfil = response.perfil;

        if (user && user.email && perfil?.rol) {
          dispatch(
            loginUser({
              email: user.email,
              isAdmin: user.is_staff,
              rol: perfil.rol,
            })
          );
        }
      })
      .catch((error) => {
        console.warn(
          "No se pudo obtener el usuario al iniciar:",
          error.message
        );
      });
  }, []);

  return { email, isAdmin, rol, doLogin, doLogout };
};
