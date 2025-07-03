import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import NavbarComponent from "../../components/Navbar";
import Footer from '../../components/footer';
import '../../styles/Card.css';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productoService';

const Tienda = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  useEffect(() => {
    new ProductoService()
      .getAllProductos()
      .then(setProductos)
      .catch(() => alert("Error al cargar productos"));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      {!showSidebar && (
        <Button
          variant="success"
          className="position-fixed start-0 m-3"
          style={{ zIndex: 1050, top: '70px' }}
          onClick={handleShow}
        >
          <List size={20} />
        </Button>
      )}

      <Offcanvas
        show={showSidebar}
        onHide={handleClose}
        backdrop
        scroll={false}
        placement="start"
        style={{ top: '56px', height: 'calc(100% - 56px)' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú de Tienda</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Buscar productos</p>
          <p>Categorías</p>
        </Offcanvas.Body>
      </Offcanvas>

      <div
        className="flex-grow-1"
        style={{
          background: 'linear-gradient(to right, #e8f5e9, #ffffff)',
          paddingTop: '60px',
          paddingBottom: '60px',
        }}
      >
        <Container fluid>
          <h2 className="text-center text-success fw-bold mb-5 display-5">Catálogo de Productos</h2>
          <Row className="g-4 justify-content-center px-3">
            {productos.map(producto => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0 card-hover">
                  {producto.imagen ? (
                    <Card.Img
                      variant="top"
                      src={producto.imagen as string}
                      alt={producto.nombre}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    >
                      Sin imagen
                    </div>
                  )}

                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-dark">{producto.nombre}</Card.Title>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button
                        variant="outline-success"
                        className="flex-fill"
                        onClick={() => navigate(`/tienda/productos/${producto.id}`)}
                      >
                        Mostrar detalles
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Tienda;
