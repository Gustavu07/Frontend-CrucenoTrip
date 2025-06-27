import { CategoriaProducto } from "./categoriaProducto";

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: FileList | string | null;
  categoria: number;
  categoria_objeto?: CategoriaProducto;
}

export interface ProductoFormData {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: FileList | null;
  categoria: number;
  categoria_objeto?: CategoriaProducto;
}
