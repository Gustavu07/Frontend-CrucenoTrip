import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { URLS } from "../../navigation/constants";
import { LoginRequest } from "../../models/dto/LoginRequest";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { doLogin } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);

    const login: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    const authService = new AuthService();

    authService
      .login(login.email, login.password)
      .then((response) => {
        return authService.me().then((user) => {
          const rol = user.perfil?.rol || "usuario";

          doLogin({
            access_token: response.access,
            refresh_token: response.refresh,
            email: user.user.email,
            isAdmin: user.user.is_staff,
            rol: rol,
          });

          if (rol === "admin") {
            navigate(URLS.Admin.Productos.LIST);
          } else {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.error("Error en login:", error);
        setLoginError(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center text-success">Iniciar sesión</h2>

      {loginError && (
        <div className="alert alert-danger text-center" role="alert">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", { required: "Este campo es requerido" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
