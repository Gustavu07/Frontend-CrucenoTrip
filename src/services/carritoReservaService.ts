import apiClient from "./interceptors";
import { CarritoReserva } from "../models/carritoReserva";

export class CarritoReservaService {
  getMiCarrito(): Promise<CarritoReserva> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("carrito-reserva/")
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            resolve(response.data[0]); // solo debería haber uno
          } else {
            reject(new Error("No se encontró ningún carrito."));
          }
        })
        .catch((error) =>
          reject(new Error("Error al obtener el carrito: " + error.message))
        );
    });
  }

  crearCarrito(): Promise<CarritoReserva> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("carrito-reserva/", {})
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 400) {
            reject(new Error("Ya tienes un carrito de reserva."));
          } else if (error.response?.status === 403) {
            reject(new Error("Debes iniciar sesión para crear un carrito."));
          } else {
            reject(new Error("Error al crear el carrito: " + error.message));
          }
        });
    });
  }
}
