import { CategoriaExperiencia } from "./categoriaExperiencia";

export interface Experiencia {
  id?: number;
  titulo: string;
  descripcion: string;
  precio_por_persona: string;
  guia?: number;
  categorias_ids: number[];
  categorias?: CategoriaExperiencia[];
  ubicacion: string;
  duracion: string;
  idiomas: string;
  imagen_experiencia: File | FileList | string | null;
  validada?: boolean;
}

export interface ExperienciaFormData {
  id?: number;
  titulo: string;
  descripcion: string;
  precio_por_persona: string;
  guia?: number;
  categorias_ids: number[];
  categorias?: CategoriaExperiencia[];
  ubicacion: string;
  duracion: string;
  idiomas: string;
  imagen_experiencia: File | FileList | string | null;
  validada?: boolean;
}
