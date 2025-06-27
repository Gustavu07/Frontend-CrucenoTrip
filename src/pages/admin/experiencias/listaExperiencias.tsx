// src/pages/admin/experiencias/ExperienciasListAdmin.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Experiencia } from "../../../models/experiencia";
import { ExperienciaService } from "../../../services/experienciaService";
import { URLS } from "../../../navigation/constants";

export const ExperienciasListAdmin = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const navigate = useNavigate();

  const cargarExperiencias = async () => {
    try {
      const res = await new ExperienciaService().getAll();
      setExperiencias(res);
    } catch (error) {
        console.error("Error al cargar experiencias:", error);
      alert("Error al cargar experiencias");
    }
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar experiencia?")) return;
    try {
      await new ExperienciaService().delete(id);
      cargarExperiencias();
    } catch {
      alert("Error al eliminar experiencia");
    }
  };

  useEffect(() => {
    cargarExperiencias();
  }, []);

  return (
    <>
      <div className="container my-4">
        <h2>Gestión de Experiencias</h2>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Ubicación</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {experiencias.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.id}</td>
                <td>
                  {exp.imagen_experiencia && typeof exp.imagen_experiencia === "string" ? (
                    <img
                    src={exp.imagen_experiencia as string}
                    alt={exp.imagen_experiencia}
                    className="img-thumbnail"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  ) : (
                    <em>Sin imagen</em>
                  )}
                </td>
                <td>{exp.titulo}</td>
                <td>Bs. {exp.precio_por_persona}</td>
                <td>{exp.ubicacion}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(URLS.Admin.Experiencias.UPDATE(exp.id!))}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(exp.id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate(URLS.Admin.Experiencias.CREATE)}
        >
          Nueva Experiencia
        </button>
      </div>
    </>
  );
};
