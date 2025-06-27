import apiClient from "./interceptors";
import { CategoriaExperiencia } from "../models/categoriaExperiencia";

export class CategoriaExperienciaService {
  getAll(): Promise<Array<CategoriaExperiencia>> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("categorias-experiencia/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener las categorías: " + error.message))
        );
    });
  }

  getById(id: number): Promise<CategoriaExperiencia> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`categorias-experiencia/${id}/`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener la categoría: " + error.message))
        );
    });
  }

  insert(categoria: CategoriaExperiencia): Promise<CategoriaExperiencia> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("categorias-experiencia/", categoria)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden agregar categorías.")
            );
          } else {
            reject(
              new Error("Error al insertar la categoría: " + error.message)
            );
          }
        });
    });
  }

  update(categoria: CategoriaExperiencia): Promise<CategoriaExperiencia> {
    return new Promise((resolve, reject) => {
      apiClient
        .put(`categorias-experiencia/${categoria.id}/`, categoria)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden modificar categorías.")
            );
          } else {
            reject(
              new Error("Error al actualizar la categoría: " + error.message)
            );
          }
        });
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`categorias-experiencia/${id}/`)
        .then(() => resolve())
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden eliminar categorías.")
            );
          } else {
            reject(
              new Error("Error al eliminar la categoría: " + error.message)
            );
          }
        });
    });
  }
}
