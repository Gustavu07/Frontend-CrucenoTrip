import apiClient from "./interceptors";
import { CategoriaProducto } from "../models/categoriaProducto";

export class CategoriaProductoService {
  getAll(): Promise<Array<CategoriaProducto>> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("categorias-producto/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener las categorías: " + error.message))
        );
    });
  }

  getById(id: number): Promise<CategoriaProducto> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`categorias-producto/${id}/`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener la categoría: " + error.message))
        );
    });
  }

  insert(categoria: CategoriaProducto): Promise<CategoriaProducto> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("categorias-producto/", categoria)
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

  update(categoria: CategoriaProducto): Promise<CategoriaProducto> {
    return new Promise((resolve, reject) => {
      apiClient
        .put(`categorias-producto/${categoria.id}/`, categoria)
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
        .delete(`categorias-producto/${id}/`)
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
