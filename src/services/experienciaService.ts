import { Experiencia } from "../models/experiencia";
import apiClient from "./interceptors";

export class ExperienciaService {
  getAll(): Promise<Experiencia[]> {
    return apiClient
      .get("experiencias/")
      .then((res) => res.data)
      .catch((error) => {
        throw new Error("Error al obtener experiencias: " + error.message);
      });
  }

  getById(id: number): Promise<Experiencia> {
    return apiClient
      .get(`experiencias/${id}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error("Error al obtener la experiencia: " + error.message);
      });
  }

  insert(experiencia: Experiencia): Promise<Experiencia> {
    const formData = new FormData();
    formData.append("titulo", experiencia.titulo);
    formData.append("descripcion", experiencia.descripcion);
    formData.append("precio_por_persona", experiencia.precio_por_persona);
    formData.append("ubicacion", experiencia.ubicacion);
    formData.append("duracion", experiencia.duracion);
    formData.append("idiomas", experiencia.idiomas);

    experiencia.categorias_ids.forEach((id) =>
      formData.append("categorias_ids", id.toString())
    );

    if (
      experiencia.imagen_experiencia instanceof FileList ||
      Array.isArray(experiencia.imagen_experiencia)
    ) {
      formData.append(
        "imagen_experiencia",
        (experiencia.imagen_experiencia as FileList)[0]
      );
    } else if (experiencia.imagen_experiencia instanceof File) {
      formData.append("imagen_experiencia", experiencia.imagen_experiencia);
    }

    return apiClient
      .post("experiencias/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error(
            "Solo los guías autenticados pueden crear experiencias."
          );
        }
        throw new Error("Error al crear la experiencia: " + error.message);
      });
  }

  update(experiencia: Experiencia): Promise<Experiencia> {
    if (!experiencia.id) {
      return Promise.reject(
        new Error("La experiencia debe tener un ID para actualizarse.")
      );
    }

    const formData = new FormData();
    formData.append("titulo", experiencia.titulo);
    formData.append("descripcion", experiencia.descripcion);
    formData.append("precio_por_persona", experiencia.precio_por_persona);
    formData.append("ubicacion", experiencia.ubicacion);
    formData.append("duracion", experiencia.duracion);
    formData.append("idiomas", experiencia.idiomas);

    experiencia.categorias_ids.forEach((id) =>
      formData.append("categorias_ids", id.toString())
    );

    if (
      experiencia.imagen_experiencia instanceof FileList ||
      Array.isArray(experiencia.imagen_experiencia)
    ) {
      formData.append(
        "imagen_experiencia",
        (experiencia.imagen_experiencia as FileList)[0]
      );
    } else if (experiencia.imagen_experiencia instanceof File) {
      formData.append("imagen_experiencia", experiencia.imagen_experiencia);
    }

    return apiClient
      .put(`experiencias/${experiencia.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error(
            "No tienes permiso para actualizar esta experiencia."
          );
        }
        throw new Error("Error al actualizar la experiencia: " + error.message);
      });
  }

  delete(id: number): Promise<void> {
    return apiClient
      .delete(`experiencias/${id}/`)
      .then(() => {})
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error("No tienes permiso para eliminar esta experiencia.");
        }
        throw new Error("Error al eliminar la experiencia: " + error.message);
      });
  }
}
