import { Producto } from "./producto";

export interface CarritoItem {
  id?: number;
  producto: number; // ID para enviar
  cantidad: number;
  producto_detalle?: Producto; // opcional para mostrar datos del producto
}
