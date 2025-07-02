import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Producto } from "../../../models/producto";
import NavbarComponent from '../../../components/adminNavbar';
import { ProductoService } from "../../../services/productoService";
import { URLS } from "../../../navigation/constants";

export const ProductosListAdmin = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = () => {
    new ProductoService()
      .getAllProductos()
      .then(setProductos)
      .catch(() => alert("Error al cargar productos"));
  };

  const eliminar = (id: number) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    new ProductoService()
      .deleteProducto(id)
      .then(() => cargarProductos())
      .catch(() => alert("Error al eliminar producto"));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <>
      <NavbarComponent />
      
      <div className="container-fluid">
        <h3 className="mb-4">Gestión de Productos</h3>

        <div className="row">
          {productos.map((p) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                {p.imagen ? (
                  <img
                    src={p.imagen as string}
                    alt={p.nombre}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                    style={{ height: "180px" }}
                  >
                    Sin imagen
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text">{p.descripcion}</p>
                  <p className="mb-2"><strong>Categoría:</strong> {p.categoria_objeto?.nombre || "-"}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        navigate(URLS.Admin.Productos.EDIT.replace(":id", String(p.id)))
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminar(p.id!)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(URLS.Admin.Productos.CREATE)}
          >
            Crear Nuevo Producto
          </button>
        </div>
      </div>
    </>
  );
};
