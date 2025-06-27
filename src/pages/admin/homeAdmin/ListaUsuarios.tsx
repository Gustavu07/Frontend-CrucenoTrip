import React, { useEffect, useState } from "react";
import { Usuario } from "../../../models/usuario";
import { AuthService } from "../../../services/AuthService";
import { useAuth } from "../../../hooks/useAuth";

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) return;

    new AuthService()
      .getAllUsers()
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="alert alert-danger m-5 text-center">
        <i className="bi bi-lock-fill me-2"></i>No tienes permiso para ver esta sección.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-5">Cargando usuarios...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5 text-center">
        Error al cargar usuarios: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-success">
        <i className="bi bi-people-fill me-2"></i>Lista de Usuarios
      </h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-success text-center">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Admin</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <span className={`badge bg-${user.is_staff ? "success" : "secondary"}`}>
                    {user.is_staff ? "Sí" : "No"}
                  </span>
                </td>
                <td>
                  <span className={`badge bg-${user.is_active ? "success" : "danger"}`}>
                    {user.is_active ? "Sí" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaUsuarios;
