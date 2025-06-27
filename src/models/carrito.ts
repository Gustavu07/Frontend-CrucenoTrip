import { CarritoItem } from "./carritoItem";

export interface Carrito {
  id?: number;
  usuario?: number;
  productos: CarritoItem[];
}
