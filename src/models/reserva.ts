import { Experiencia } from "./experiencia";

export interface Reserva {
  id?: number;
  carrito: number;
  experiencia: number | Experiencia;
  experiencia_titulo?: string;
  fecha_reservada: string;
  estado_pago?: "pendiente" | "pagado";
  comprobante_pago?: File | string | null;
  usuario?: string;
}
