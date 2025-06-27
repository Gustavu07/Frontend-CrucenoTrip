import { Usuario } from "./usuario";

export interface Perfil {
  id?: number;
  user: Usuario;
  telefono: string;
  rol: "usuario" | "guia" | "admin";
  licencias?: File | string | null;
}
