import { CarritoReserva } from "../models/carritoReserva";
import apiClient from "./interceptors";

export class CarritoReservaService {
  async getMiCarritoReserva(): Promise<CarritoReserva[]> {
    try {
      const res = await apiClient.get("carrito-reserva/");
      return res.data;
    } catch (error: any) {
      throw new Error(
        "Error al obtener el carrito de reserva: " + error.message
      );
    }
  }

  async getCarritoReservaById(id: number): Promise<CarritoReserva> {
    try {
      const res = await apiClient.get(`carrito-reserva/${id}/`);
      return res.data;
    } catch (error: any) {
      throw new Error(
        "Error al obtener el carrito de reserva: " + error.message
      );
    }
  }

  async createCarritoReserva(): Promise<CarritoReserva> {
    try {
      const res = await apiClient.post("carrito-reserva/", {});
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      if (
        error.response?.data?.non_field_errors?.[0] ===
        "Ya tienes un carrito de reserva."
      ) {
        throw new Error("Ya tienes un carrito de reserva.");
      }
      throw new Error("Error al crear el carrito de reserva: " + error.message);
    }
  }

  async deleteCarritoReserva(id: number): Promise<void> {
    try {
      await apiClient.delete(`carrito-reserva/${id}/`);
    } catch (error: any) {
      throw new Error(
        "Error al eliminar el carrito de reserva: " + error.message
      );
    }
  }
}
