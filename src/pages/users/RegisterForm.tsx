import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { URLS } from "../../navigation/constants";
import { AuthService } from "../../services/AuthService";
import { RegisterRequest } from "../../models/dto/RegisterRequest";

type Inputs = {
  email: string;
  password: string;
  username: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licenciasFile, setLicenciasFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);
    const registerRequest: RegisterRequest = { ...data };

    new AuthService()
      .register(
        registerRequest.username,
        registerRequest.email,
        registerRequest.password,
        registerRequest.nombre,
        registerRequest.apellido,
        registerRequest.telefono,
        registerRequest.rol,
        licenciasFile // ← nuevo argumento
      )
      .then(() => navigate(URLS.LOGIN))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error inesperado al registrar");
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const selectedRol = watch("rol");

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="mb-4 text-center text-success">Crear una cuenta</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* IMPORTANTE: no necesitas encType aquí, React lo añade al detectar <input type="file"> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Este campo es requerido" })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Este campo es requerido" })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              {...register("nombre", { required: "Este campo es requerido" })}
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input
              type="text"
              id="apellido"
              className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
              {...register("apellido", { required: "Este campo es requerido" })}
            />
            {errors.apellido && <div className="invalid-feedback">{errors.apellido.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
              {...register("telefono", { required: "Este campo es requerido" })}
            />
            {errors.telefono && <div className="invalid-feedback">{errors.telefono.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select
              id="rol"
              className={`form-select ${errors.rol ? "is-invalid" : ""}`}
              {...register("rol", { required: "Este campo es requerido" })}
            >
              <option value="">Selecciona un rol</option>
              <option value="usuario">Usuario</option>
              <option value="guia">Guía</option>
            </select>
            {errors.rol && <div className="invalid-feedback">{errors.rol.message}</div>}
          </div>

          {/* Campo de archivo SOLO visible para guía */}
          {selectedRol === "guia" && (
            <div className="mb-3">
              <label htmlFor="licencias" className="form-label">Licencia (PDF o imagen)</label>
              <input
                type="file"
                id="licencias"
                accept=".pdf,.jpg,.jpeg,.png"
                className="form-control"
                onChange={(e) => setLicenciasFile(e.target.files?.[0] || null)}
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span>¿Ya tienes una cuenta? </span>
          <button
            className="btn btn-link text-success p-0"
            onClick={() => navigate(URLS.LOGIN)}
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};
