import { Carrito } from "../models/carrito";
import apiClient from "./interceptors";

export class carritoervice {
  async getMiscarrito(): Promise<Carrito[]> {
    try {
      const res = await apiClient.get("carrito/");
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener el carrito: " + error.message);
    }
  }

  async getCarritoById(id: number): Promise<Carrito> {
    try {
      const res = await apiClient.get(`carrito/${id}/`);
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener el carrito: " + error.message);
    }
  }

  async createCarrito(carrito: Carrito): Promise<Carrito> {
    try {
      const res = await apiClient.post("carrito/", carrito);
      return res.data;
    } catch (error: any) {
      throw new Error("Error al crear el carrito: " + error.message);
    }
  }

  async updateCarrito(carrito: Carrito): Promise<Carrito> {
    if (!carrito.id) {
      throw new Error("El carrito debe tener un ID para actualizarse.");
    }

    try {
      const res = await apiClient.put(`carrito/${carrito.id}/`, carrito);
      return res.data;
    } catch (error: any) {
      throw new Error("Error al actualizar el carrito: " + error.message);
    }
  }

  async deleteCarrito(id: number): Promise<void> {
    try {
      await apiClient.delete(`carrito/${id}/`);
    } catch (error: any) {
      throw new Error("Error al eliminar el carrito: " + error.message);
    }
  }
}
