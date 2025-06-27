import { Producto } from "../models/producto";
import apiClient from "./interceptors";

export class ProductoService {
  getAllProductos(): Promise<Producto[]> {
    return apiClient
      .get("productos/")
      .then((res) => res.data)
      .catch((error) => {
        throw new Error("Error al obtener los productos: " + error.message);
      });
  }

  getProducto(id: number): Promise<Producto> {
    return apiClient
      .get(`productos/${id}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error("Error al obtener el producto: " + error.message);
      });
  }

  insertProducto(producto: Producto): Promise<Producto> {
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("descripcion", producto.descripcion);
    formData.append("precio", producto.precio.toString());
    formData.append("categoria", producto.categoria.toString());

    if (producto.imagen && producto.imagen.length > 0) {
      formData.append("imagen", producto.imagen[0]);
    }

    return apiClient
      .post("productos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error("Solo los administradores pueden agregar productos.");
        }
        throw new Error("Error al insertar el producto: " + error.message);
      });
  }

  updateProducto(producto: Producto): Promise<Producto> {
    if (!producto.id) {
      return Promise.reject(
        new Error("El producto debe tener un ID para actualizarse.")
      );
    }

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("descripcion", producto.descripcion);
    formData.append("precio", producto.precio.toString());
    formData.append("categoria", producto.categoria.toString());

    if (producto.imagen && producto.imagen.length > 0) {
      formData.append("imagen", producto.imagen[0]);
    }

    return apiClient
      .put(`productos/${producto.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error(
            "Solo los administradores pueden modificar productos."
          );
        }
        throw new Error("Error al actualizar el producto: " + error.message);
      });
  }

  deleteProducto(id: number): Promise<void> {
    return apiClient
      .delete(`productos/${id}/`)
      .then(() => {})
      .catch((error) => {
        if (error.response?.status === 403) {
          throw new Error(
            "Solo los administradores pueden eliminar productos."
          );
        }
        throw new Error("Error al eliminar el producto: " + error.message);
      });
  }
}
