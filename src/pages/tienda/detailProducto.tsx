// src/pages/productos/ProductoDetalle.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productoService';
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/footer';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    new ProductoService()
      .getProducto(Number(id))
      .then(setProducto)
      .catch(() => setError("No se pudo cargar el producto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center my-5"><Spinner animation="border" /></div>;
  }

  if (error || !producto) {
    return <Alert variant="danger" className="text-center">{error || "Producto no encontrado"}</Alert>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <Container className="my-5">
        <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: '600px' }}>
          {producto.imagen && (
            <Card.Img
              variant="top"
              src={producto.imagen as string}
              alt={producto.nombre}
              style={{ objectFit: 'cover', height: '300px' }}
            />
          )}
          <Card.Body>
            <Card.Title className="text-success fs-3">{producto.nombre}</Card.Title>
            <Card.Text className="text-muted">{producto.descripcion}</Card.Text>
            <Card.Text><strong>Categoría:</strong> {producto.categoria_objeto?.nombre || "Sin categoría"}</Card.Text>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
};

export default ProductoDetalle;
