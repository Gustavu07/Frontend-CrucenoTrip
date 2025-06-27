import { Perfil } from "../perfil";
import { Usuario } from "../usuario";

export interface UserInfoResponse {
  user: Usuario;
  perfil: Perfil;
}
