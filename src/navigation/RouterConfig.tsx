import { Routes, Route } from "react-router";
import { URLS } from "./constants";

import { LoginForm } from "../pages/users/LoginForm";
import { RegisterForm } from "../pages/users/RegisterForm";
import  Home from "../pages/home";
import ListaUsuarios from "../pages/admin/homeAdmin/ListaUsuarios";
import CategoriaProductoAdmin from "../pages/admin/productos/CategoriaProductoAdmin";
import CategoriaExperienciaAdmin from "../pages/admin/experiencias/categoriaExperienciaAdmin";
import { ProductosListAdmin } from "../pages/admin/productos/ListaProductos";
import { ProductoForm } from "../pages/admin/productos/FormularioProducto";
import { ExperienciaForm } from "../pages/admin/experiencias/formularioExperiencia";
import { ExperienciasListAdmin } from "../pages/admin/experiencias/listaExperiencias";
import Tienda from "../pages/tienda/tiendaProducto";
import PerfilUsuario from "../pages/users/PerfilUsuario";
import ExperienciasPublicas from "../pages/destinos/experiencia";
import DetalleExperiencia from "../pages/destinos/detailExperiencia";
import MisReservas from "../pages/reservas/reservas";
import DetalleReserva from "../pages/reservas/detalleReserva";
import Nosotros from "../pages/sobreNosotros";
import ProductoDetalle from "../pages/tienda/detailProducto";



const RouterConfig = () => {
  return (
    <Routes>
      <Route path={URLS.HOME} element={<Home />}/>
      <Route path={URLS.LOGIN} element={<LoginForm />} />
      <Route path={URLS.REGISTER} element={<RegisterForm />} />
      <Route path={URLS.PERFIL} element={<PerfilUsuario />} />
      <Route path={URLS.LISTPUBLIC} element={<Tienda />} />
      <Route path={URLS.DETALLE_PRODUCTO} element={<ProductoDetalle />} />
      <Route path={URLS.EXPERIENCIAS_PUBLICAS} element={<ExperienciasPublicas />} />
      <Route path={URLS.EXPERIENCIA_DETALLE} element={<DetalleExperiencia />} />
      <Route path={URLS.RESERVA} element={<MisReservas />} />
      <Route path={URLS.RESERVA_DETALLE} element={<DetalleReserva />} />
      <Route path={URLS.NOSOTROS} element={<Nosotros />} /> {/* Cambiar a la página de Sobre Nosotros si existe */}

      {/* Rutas de administración */}
      <Route path={URLS.Admin.LISTUSER} element={<ListaUsuarios />} />
      <Route path={URLS.Admin.LISTCATEGORIA_PRODUCTO} element={<CategoriaProductoAdmin />} />
      <Route path={URLS.Admin.LISTCATEGORIA_EXPERIENCIA} element={<CategoriaExperienciaAdmin />} />
      <Route path={URLS.Admin.Productos.LIST} element={<ProductosListAdmin />} />
      <Route path={URLS.Admin.Productos.CREATE} element={<ProductoForm />} />
      <Route path={URLS.Admin.Productos.EDIT} element={<ProductoForm />} />
      <Route path={URLS.Admin.Experiencias.LIST} element={<ExperienciasListAdmin />} />
      <Route path={URLS.Admin.Experiencias.CREATE} element={<ExperienciaForm />} />
      <Route path={URLS.Admin.Experiencias.EDIT} element={<ExperienciaForm />} />


    </Routes>
  );
};

export default RouterConfig;
