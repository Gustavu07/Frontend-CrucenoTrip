import apiClient from "./interceptors";
import { Reserva } from "../models/reserva";

export class ReservaService {
  getMisReservas(): Promise<Reserva[]> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("reservas/")
        .then((res) => resolve(res.data))
        .catch((error) =>
          reject(new Error("Error al obtener las reservas: " + error.message))
        );
    });
  }

  getReservaById(id: number): Promise<Reserva> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`reservas/${id}/`)
        .then((res) => resolve(res.data))
        .catch((error) =>
          reject(new Error("Error al obtener la reserva: " + error.message))
        );
    });
  }

  createReserva(reserva: Reserva): Promise<Reserva> {
    const formData = new FormData();
    formData.append("carrito", reserva.carrito.toString());
    formData.append("experiencia", reserva.experiencia.toString());
    formData.append("fecha_reservada", reserva.fecha_reservada);
    if (reserva.comprobante_pago) {
      formData.append("comprobante_pago", reserva.comprobante_pago);
    }

    return new Promise((resolve, reject) => {
      apiClient
        .post("reservas/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response?.data?.non_field_errors?.[0]) {
            reject(new Error(error.response.data.non_field_errors[0]));
          } else if (error.response?.data?.detail) {
            reject(new Error(error.response.data.detail));
          } else {
            reject(new Error("Error al crear la reserva: " + error.message));
          }
        });
    });
  }

  updateReserva(reserva: Reserva): Promise<Reserva> {
    if (!reserva.id) {
      return Promise.reject(
        new Error("La reserva debe tener un ID para actualizarse.")
      );
    }

    const formData = new FormData();
    formData.append("carrito", reserva.carrito.toString());
    formData.append("experiencia", reserva.experiencia.toString());
    formData.append("fecha_reservada", reserva.fecha_reservada);
    if (reserva.comprobante_pago) {
      formData.append("comprobante_pago", reserva.comprobante_pago);
    }

    return new Promise((resolve, reject) => {
      apiClient
        .put(`reservas/${reserva.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(new Error("No tienes permiso para modificar esta reserva."));
          } else {
            reject(
              new Error("Error al actualizar la reserva: " + error.message)
            );
          }
        });
    });
  }

  deleteReserva(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`reservas/${id}/`)
        .then(() => resolve())
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(new Error("No tienes permiso para eliminar esta reserva."));
          } else {
            reject(new Error("Error al eliminar la reserva: " + error.message));
          }
        });
    });
  }
}
