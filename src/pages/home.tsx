import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import { Flower2, Palette, Bird } from 'lucide-react';
import Footer from '../components/footer';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

interface Lugar {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const lugares: Lugar[] = [
  {
    id: 1,
    nombre: 'Catedral de Santa Cruz',
    descripcion: 'El corazón del centro histórico, rodeado de edificios coloniales y la catedral.',
    imagen: '/Santa-Cruz-Church-Bolivia.avif',
  },
  {
    id: 2,
    nombre: 'Parque El Arenal',
    descripcion: 'Un oasis urbano con laguna, arte y vegetación.',
    imagen: '/parque-lomas-de-arena.jpg',
  },
  {
    id: 3,
    nombre: 'Porongo City',
    descripcion: ' ubicado en la provincia Andrés Ibáñez en el departamento de Santa Cruz',
    imagen: '/01.jpg',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
      <title>Cruceño Trip | Turismo en Santa Cruz</title>
      <meta name="description" content="Descubre experiencias turísticas auténticas en Santa Cruz con Cruceño Trip." />
      <meta name="keywords" content="turismo Santa Cruz, experiencias cruceñas, guías turísticos, artesanías Bolivia" />
      <meta name="author" content="Cruceño Trip" />
      </Helmet>

      <NavbarComponent />

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/Santa-Cruz-Church-Bolivia.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          color: 'white',
        }}
      >
        <Container>
          <h1 className="fw-bold display-3 mb-3 animate__animated animate__fadeInDown">
            Bienvenido a Santa Cruz de la Sierra
          </h1>
          <p className="lead animate__animated animate__fadeInUp">
            Descubre experiencias únicas con <span className="fw-bold text-success">Cruceo Trip</span>
          </p>
          <Button
            variant="light"
            size="lg"
            style={{ backgroundColor: '#198754', borderColor: '#198754', color: 'white' }}
            className="mt-4 px-5 py-3 fw-bold shadow animate__animated animate__zoomIn"
            onClick={() => navigate('/experiencias')}
          >
            Explorar ahora
          </Button>
        </Container>
      </div>

      {/* Lugares destacados */}
      <Container fluid className="my-5">
        <h2 className="fw-bold text-success text-center mb-4">Lugares más visitados este mes</h2>
        <Row className="g-4 justify-content-center px-4">
          {lugares.map((lugar) => (
            <Col key={lugar.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0 bg-light hover-shadow" style={{ borderRadius: '20px' }}>
                <div style={{ overflow: 'hidden', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                  <Card.Img
                    variant="top"
                    src={lugar.imagen}
                    alt={lugar.nombre}
                    style={{
                      height: '180px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-success fw-bold">{lugar.nombre}</Card.Title>
                  <Card.Text style={{ fontSize: '0.95rem' }}>{lugar.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Container fluid className="my-5 px-4">
  <h2 className="fw-bold text-center mb-5">Existimos para:</h2>
  <Row className="text-center justify-content-center">
    <Col xs={12} md={4} className="mb-4">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#198754',
        }}
      >
        <Flower2 color="white" size={36} />
      </div>
      <p>
        Generar <span className="fw-bold text-success">procesos de equidad de género</span> a través del empoderamiento de las artesanas.
      </p>
    </Col>

    <Col xs={12} md={4} className="mb-4">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#198754',
        }}
      >
        <Palette color="white" size={36} />
      </div>
      <p>
        <span className="fw-bold text-success">Preservación del patrimonio cultural</span> y fomento a la creatividad e innovación.
      </p>
    </Col>

    <Col xs={12} md={4} className="mb-4">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#198754',
        }}
      >
        <Bird color="white" size={36} />
      </div>
      <p>
        <span className="fw-bold text-success">Preservar el patrimonio natural</span> para asegurar el acceso a materia prima para la generación actual y las venideras.
      </p>
    </Col>
  </Row>
</Container>


      </Container>
            {/* Sección de propósito institucional */}
            <Container fluid className="my-5 px-4">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <img
              src="/public/5-2.jpeg" // 👈 Asegúrate de reemplazar esto con la ruta correcta del archivo
              alt="Mujeres sonriendo"
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={12} md={6}>
            <h2 className="fw-bold" style={{ fontSize: '2rem' }}>
              Nuestro objetivo es promover el desarrollo cultural a través del <span className="text-dark">arte originario y popular</span>
            </h2>
            <hr style={{ width: '50px', borderTop: '4px solid black', margin: '1rem 0' }} />
            <p className="text-muted mb-4">
              Deseamos que conozcas el espíritu de nuestro trabajo y los valores a los que nos adherimos.
            </p>
            <Button
              variant="dark"
              className="px-4 py-2 fw-bold"
              onClick={() => navigate('/nosotros')}
            >
              Conoce nuestra razón de ser
            </Button>
          </Col>
        </Row>
      </Container>


      {/* Mapa */}
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Container fluid className="my-5 px-4">
          <h2 className="fw-bold text-success text-center mb-4">Nuestra Ubicación</h2>
          <div
            style={{
              height: '450px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <Map
              center={{ lat: -17.7833, lng: -63.1821 }}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <Marker position={{ lat: -17.772945, lng: -63.193703 }} />
            </Map>
          </div>
        </Container>
      </APIProvider>

      <Footer />
    </>
  );
};

export default Home;
