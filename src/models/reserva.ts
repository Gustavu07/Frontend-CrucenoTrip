import { Experiencia } from "./experiencia";

export interface Reserva {
  id?: number;
  carrito: number;
  experiencia: number;
  experiencia_titulo?: string;
  fecha_reservada: string;
  estado_pago?: string;
  comprobante_pago?: File | null;
  usuario?: string;
}
