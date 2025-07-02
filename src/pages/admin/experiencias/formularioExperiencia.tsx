// src/pages/admin/experiencias/ExperienciaForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Experiencia, ExperienciaFormData } from "../../../models/experiencia";
import { ExperienciaService } from "../../../services/experienciaService";
import { CategoriaExperienciaService } from "../../../services/categoriaExperienciaService";
import { CategoriaExperiencia } from "../../../models/categoriaExperiencia";
import { URLS } from "../../../navigation/constants";

export const ExperienciaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<CategoriaExperiencia[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienciaFormData>();

const onSubmit: SubmitHandler<ExperienciaFormData> = async (data) => {
  const experiencia: Experiencia = {
    ...data,
    imagen_experiencia:
      data.imagen_experiencia instanceof FileList && data.imagen_experiencia.length > 0
        ? data.imagen_experiencia[0]
        : typeof data.imagen_experiencia === "string"
        ? data.imagen_experiencia
        : null,
  };

  try {
    const service = new ExperienciaService();

    if (id) {
      await service.update({ ...experiencia, id: Number(id) });
      alert("Experiencia actualizada");
    } else {
      await service.insert(experiencia);
      alert("Experiencia creada");
    }

    navigate(URLS.Admin.Experiencias.LIST);
  } catch (err) {
    console.error(err);
    alert("Error al guardar la experiencia");
  }
};


  const loadData = async () => {
    const cat = await new CategoriaExperienciaService().getAll();
    setCategorias(cat);

    if (id) {
      const exp = await new ExperienciaService().getById(Number(id));
      reset({
        titulo: exp.titulo,
        descripcion: exp.descripcion,
        precio_por_persona: exp.precio_por_persona,
        ubicacion: exp.ubicacion,
        duracion: exp.duracion,
        idiomas: exp.idiomas,
        categorias_ids: exp.categorias?.map((c) => c.id!) || [],
        imagen_experiencia: null,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div className="container my-4">
      <h2>{id ? "Editar Experiencia" : "Nueva Experiencia"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Título:</label>
          <input className="form-control" {...register("titulo", { required: "Requerido" })} />
          {errors.titulo && <span className="text-danger">{errors.titulo.message}</span>}
        </div>

        <div className="mb-3">
          <label>Descripción:</label>
          <textarea className="form-control" {...register("descripcion", { required: "Requerido" })} />
          {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
        </div>

        <div className="mb-3">
          <label>Precio por persona:</label>
          <input className="form-control" {...register("precio_por_persona", { required: "Requerido" })} />
          {errors.precio_por_persona && <span className="text-danger">{errors.precio_por_persona.message}</span>}
        </div>

        <div className="mb-3">
          <label>Ubicación:</label>
          <input className="form-control" {...register("ubicacion", { required: "Requerido" })} />
        </div>

        <div className="mb-3">
          <label>Duración:</label>
          <input className="form-control" {...register("duracion", { required: "Requerido" })} />
        </div>

        <div className="mb-3">
          <label>Idiomas:</label>
          <input className="form-control" {...register("idiomas", { required: "Requerido" })} />
        </div>

        <div className="mb-3">
          <label>Categorías:</label>
          <select className="form-select" multiple {...register("categorias_ids", { required: true })}>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Imagen:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            {...register("imagen_experiencia", { required: !id })}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(URLS.Admin.Experiencias.LIST)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
