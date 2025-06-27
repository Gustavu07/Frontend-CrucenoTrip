import { CarritoItem } from "../models/carritoItem";
import apiClient from "./interceptors";

export class CarritoItemService {
  async getItems(): Promise<CarritoItem[]> {
    try {
      const res = await apiClient.get("carrito-productos/");
      return res.data;
    } catch (error: any) {
      throw new Error(
        "Error al obtener los ítems del carrito: " + error.message
      );
    }
  }

  async addItem(item: CarritoItem): Promise<CarritoItem> {
    try {
      const res = await apiClient.post("carrito-productos/", {
        producto: item.producto,
        cantidad: item.cantidad,
      });
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error(
        "Error al agregar el producto al carrito: " + error.message
      );
    }
  }

  async updateItem(item: CarritoItem): Promise<CarritoItem> {
    if (!item.id) {
      throw new Error("El ítem debe tener un ID para actualizarse.");
    }

    try {
      const res = await apiClient.put(`carrito-productos/${item.id}/`, {
        producto: item.producto,
        cantidad: item.cantidad,
      });
      return res.data;
    } catch (error: any) {
      throw new Error(
        "Error al actualizar el ítem del carrito: " + error.message
      );
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      await apiClient.delete(`carrito-productos/${id}/`);
    } catch (error: any) {
      throw new Error(
        "Error al eliminar el ítem del carrito: " + error.message
      );
    }
  }
}
