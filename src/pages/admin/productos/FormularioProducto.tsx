// src/pages/admin/productos/ProductoForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Producto, ProductoFormData } from '../../../models/producto';
import { ProductoService } from "../../../services/productoService";
import { CategoriaProductoService } from "../../../services/categoriaProductoService";
import { CategoriaProducto } from "../../../models/categoriaProducto";
import { URLS } from "../../../navigation/constants";

export const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductoFormData>();

  const onSubmit: SubmitHandler<ProductoFormData> = async (data) => {
    const producto: Producto = {
      ...data,
      imagen: data.imagen,
    };

    const service = new ProductoService();

    try {
      if (id) {
        await service.updateProducto({ ...producto, id: Number(id) });
        alert("Producto actualizado");
      } else {
        await service.insertProducto(producto);
        alert("Producto creado");
      }
      navigate(URLS.Admin.Productos.LIST);
    } catch (err) {
      alert("Error al guardar producto");
      console.error(err);
    }
  };

  const loadProducto = async () => {
    if (!id) return;
    const prod = await new ProductoService().getProducto(Number(id));
    reset({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      categoria: prod.categoria,
      imagen: null,
    });
  };

  const loadCategorias = async () => {
    const response = await new CategoriaProductoService().getAll();
    setCategorias(response);
  };

  useEffect(() => {
    loadCategorias();
    loadProducto();
  }, [id]);

  return (
    <div className="container my-5">
      <h3 className="mb-4">{id ? "Editar Producto" : "Nuevo Producto"}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            className="form-control"
            {...register("nombre", { required: "Requerido" })}
          />
          {errors.nombre && <div className="text-danger">{errors.nombre.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            className="form-control"
            {...register("descripcion", { required: "Requerido" })}
          />
          {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            id="precio"
            type="text"
            className="form-control"
            {...register("precio", {
              required: "Requerido",
              pattern: { value: /^[0-9.]+$/, message: "Solo números" },
            })}
          />
          {errors.precio && <div className="text-danger">{errors.precio.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            className="form-select"
            {...register("categoria", { required: true })}
          >
            <option value="">Seleccionar</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errors.categoria && <div className="text-danger">Campo requerido</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <input
            id="imagen"
            type="file"
            className="form-control"
            accept="image/*"
            {...register("imagen", { required: !id ? "Debe subir una imagen" : false })}
          />
          {errors.imagen && <div className="text-danger">{errors.imagen.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(URLS.Admin.Productos.LIST)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
