import { Reserva } from "../models/reserva";
import apiClient from "./interceptors";

export class ReservaService {
  async getMisReservas(): Promise<Reserva[]> {
    try {
      const res = await apiClient.get("reservas/");
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener las reservas: " + error.message);
    }
  }

  async getReservaById(id: number): Promise<Reserva> {
    try {
      const res = await apiClient.get(`reservas/${id}/`);
      return res.data;
    } catch (error: any) {
      throw new Error("Error al obtener la reserva: " + error.message);
    }
  }

  async createReserva(reserva: Reserva): Promise<Reserva> {
    try {
      const formData = new FormData();
      formData.append("carrito", reserva.carrito.toString());
      formData.append("experiencia", reserva.experiencia.toString());
      formData.append("fecha_reservada", reserva.fecha_reservada);

      if (reserva.comprobante_pago) {
        formData.append("comprobante_pago", reserva.comprobante_pago);
      }

      const res = await apiClient.post("reservas/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.non_field_errors?.[0]) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("Error al crear la reserva: " + error.message);
    }
  }

  async updateReserva(reserva: Reserva): Promise<Reserva> {
    if (!reserva.id) {
      throw new Error("La reserva debe tener un ID para actualizarse.");
    }

    try {
      const formData = new FormData();
      formData.append("carrito", reserva.carrito.toString());
      formData.append("experiencia", reserva.experiencia.toString());
      formData.append("fecha_reservada", reserva.fecha_reservada);

      if (reserva.comprobante_pago) {
        formData.append("comprobante_pago", reserva.comprobante_pago);
      }

      const res = await apiClient.put(`reservas/${reserva.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permiso para modificar esta reserva.");
      }
      throw new Error("Error al actualizar la reserva: " + error.message);
    }
  }

  async deleteReserva(id: number): Promise<void> {
    try {
      await apiClient.delete(`reservas/${id}/`);
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permiso para eliminar esta reserva.");
      }
      throw new Error("Error al eliminar la reserva: " + error.message);
    }
  }
}
