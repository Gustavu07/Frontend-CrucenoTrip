import React, { useEffect, useState } from "react";
import { CategoriaExperiencia } from "../../../models/categoriaExperiencia";
import { CategoriaExperienciaService } from "../../../services/categoriaExperienciaService";

const CategoriaExperienciaAdmin: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaExperiencia[]>([]);
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState<CategoriaExperiencia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const servicio = new CategoriaExperienciaService();

  const cargarCategorias = () => {
    servicio
      .getAll()
      .then(setCategorias)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    const datos: CategoriaExperiencia = { nombre };

    const accion = editando
      ? servicio.update({ ...datos, id: editando.id })
      : servicio.insert(datos);

    accion
      .then(() => {
        setNombre("");
        setEditando(null);
        setMensaje(editando ? "Categoría actualizada" : "Categoría creada");
        cargarCategorias();
      })
      .catch((e) => setError(e.message));
  };

  const manejarEditar = (categoria: CategoriaExperiencia) => {
    setNombre(categoria.nombre);
    setEditando(categoria);
    setMensaje(null);
    setError(null);
  };

  const manejarEliminar = (id?: number) => {
    if (!id) return;
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;

    servicio
      .delete(id)
      .then(() => {
        setMensaje("Categoría eliminada");
        cargarCategorias();
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-success text-center">
        Administrar Categorías de Experiencias
      </h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={manejarSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre de categoría</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editando ? "Actualizar" : "Agregar"} categoría
        </button>
        {editando && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditando(null);
              setNombre("");
              setMensaje(null);
              setError(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h4>Categorías existentes</h4>
      <ul className="list-group">
        {categorias.map((cat) => (
          <li
            key={cat.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {cat.nombre}
            <div>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => manejarEditar(cat)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => manejarEliminar(cat.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaExperienciaAdmin;
