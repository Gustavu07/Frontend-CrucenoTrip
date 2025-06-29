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
    <div className="container my-5">
  <h2 className="text-center mb-4">Gestión de Experiencias</h2>

  <div className="text-center mb-4">
    <button
      className="btn btn-success"
      onClick={() => navigate(URLS.Admin.Experiencias.CREATE)}
    >
      Nueva Experiencia
    </button>
  </div>

  <div className="row justify-content-center">
    {experiencias.map((exp) => (
      <div key={exp.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4">
        <div className="card shadow w-100">
          {exp.imagen_experiencia && typeof exp.imagen_experiencia === "string" ? (
            <img
              src={exp.imagen_experiencia}
              alt={exp.titulo}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="card-img-top bg-light d-flex align-items-center justify-content-center"
              style={{ height: "200px", color: "#999" }}
            >
              Sin imagen
            </div>
          )}
          <div className="card-body text-center d-flex flex-column">
            <h5 className="card-title">{exp.titulo}</h5>
            <p className="card-text mb-1">
              <strong>Precio:</strong> Bs. {exp.precio_por_persona}
            </p>
            <p className="card-text mb-3">
              <strong>Ubicación:</strong> {exp.ubicacion}
            </p>
            <div className="mt-auto d-flex justify-content-center gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate(URLS.Admin.Experiencias.UPDATE(exp.id!))}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminar(exp.id!)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};
