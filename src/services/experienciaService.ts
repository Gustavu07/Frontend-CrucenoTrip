import { Experiencia } from "../models/experiencia";
import apiClient from "./interceptors";

export class ExperienciaService {
  async getAll(): Promise<Experiencia[]> {
    try {
      const res = await apiClient.get("experiencias/");
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener las experiencias: " + error.message);
    }
  }

  async getById(id: number): Promise<Experiencia> {
    try {
      const res = await apiClient.get(`experiencias/${id}/`);
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener la experiencia: " + error.message);
    }
  }

  async create(experiencia: Experiencia): Promise<Experiencia> {
    try {
      const formData = new FormData();

      formData.append("titulo", experiencia.titulo);
      formData.append("descripcion", experiencia.descripcion);
      formData.append("precio_por_persona", experiencia.precio_por_persona);
      formData.append("ubicacion", experiencia.ubicacion);
      formData.append("duracion", experiencia.duracion);
      formData.append("idiomas", experiencia.idiomas);

      experiencia.categorias_ids.forEach((id) => {
        formData.append("categorias_ids", id.toString());
      });

      if (
        experiencia.imagen_experiencia &&
        typeof experiencia.imagen_experiencia !== "string"
      ) {
        formData.append("imagen_experiencia", experiencia.imagen_experiencia);
      }

      const res = await apiClient.post("experiencias/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error("Error al crear la experiencia: " + error.message);
    }
  }

  async update(experiencia: Experiencia): Promise<Experiencia> {
    if (!experiencia.id) {
      throw new Error("La experiencia debe tener un ID para actualizarse.");
    }

    try {
      const formData = new FormData();

      formData.append("titulo", experiencia.titulo);
      formData.append("descripcion", experiencia.descripcion);
      formData.append("precio_por_persona", experiencia.precio_por_persona);
      formData.append("ubicacion", experiencia.ubicacion);
      formData.append("duracion", experiencia.duracion);
      formData.append("idiomas", experiencia.idiomas);

      experiencia.categorias_ids.forEach((id) => {
        formData.append("categorias_ids", id.toString());
      });

      if (
        experiencia.imagen_experiencia &&
        typeof experiencia.imagen_experiencia !== "string"
      ) {
        formData.append("imagen_experiencia", experiencia.imagen_experiencia);
      }

      const res = await apiClient.put(
        `experiencias/${experiencia.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permiso para modificar esta experiencia.");
      }
      throw new Error("Error al actualizar la experiencia: " + error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`experiencias/${id}/`);
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permiso para eliminar esta experiencia.");
      }
      throw new Error("Error al eliminar la experiencia: " + error.message);
    }
  }
}
