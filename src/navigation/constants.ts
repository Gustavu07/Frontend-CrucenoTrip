export const URLS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PERFIL: "/perfil",
  NOSOTROS: "/nosotros",
  LISTPUBLIC: "/tienda/productos",
  DETALLE_PRODUCTO: "/tienda/productos/:id",
  EXPERIENCIAS_PUBLICAS: "/experiencias",
  EXPERIENCIA_DETALLE: "/experiencias/:id",
  RESERVA: "/reservas",
  RESERVA_DETALLE: "/reservas/:id",

  Admin: {
    LISTUSER: "/admin/users",
    LISTCATEGORIA_PRODUCTO: "/admin/categorias-producto",
    LISTCATEGORIA_EXPERIENCIA: "/admin/categorias-experiencia",
    Productos: {
      LIST: "/productos",
      CREATE: "/productos/create",
      EDIT: "/productos/:id/edit",
      UPDATE: (id: string | number) => `/productos/${id}`,
    },
    Experiencias: {
      LIST: "admin/experiencias",
      CREATE: "/experiencias/create",
      EDIT: "/experiencias/:id/edit",
      UPDATE: (id: string | number) => `/experiencias/${id}`,
    },
  },
};
