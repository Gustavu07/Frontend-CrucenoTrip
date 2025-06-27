export const URLS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
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
      LIST: "/experiencias",
      CREATE: "/experiencias/create",
      EDIT: "/experiencias/:id/edit",
      UPDATE: (id: string | number) => `/experiencias/${id}`,
    },
  },
};
