import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button, Badge } from 'react-bootstrap';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productoService';
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/footer';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      new ProductoService()
        .getProducto(Number(id))
        .then(setProducto)
        .catch(() => alert("Error al cargar el producto"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">Producto no encontrado.</p>
        <Button variant="outline-success" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className="mb-4">
            <Card className="shadow border-0">
              {producto.imagen ? (
                <Card.Img
                  src={producto.imagen as string}
                  alt={producto.nombre}
                  style={{ maxHeight: '350px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                />
              ) : (
                <div className="text-center py-5 bg-light">Sin imagen disponible</div>
              )}
              <Card.Body className="p-4">
                <h3 className="fw-bold text-success">{producto.nombre}</h3>
                <Badge bg="secondary" className="mb-2">
                  ID Categoría: {producto.categoria}
                </Badge>
                <p className="text-muted">{producto.descripcion}</p>
                <h4 className="text-success">Bs. {Number(producto.precio).toFixed(2)}</h4>
                <div className="d-grid gap-2 mt-4">
                  <Button variant="success" size="lg">
                    Agregar al carrito
                  </Button>
                  <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    Volver a la tienda
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductoDetalle;
