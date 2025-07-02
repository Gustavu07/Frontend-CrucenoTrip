import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
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
    imagen: '/Santa-Cruz-Church-Bolivia.jpg',
  },
  {
    id: 2,
    nombre: 'Parque El Arenal',
    descripcion: 'Un oasis urbano con laguna, arte y vegetación.',
    imagen: '/Santa-Cruz-Church-Bolivia.jpg',
  },
  {
    id: 3,
    nombre: 'Cascadas Espejillos',
    descripcion: 'Naturaleza pura con senderos, mariposas y piscinas naturales.',
    imagen: '/2f28ecb9b611b548d13861c5f6359ed1.jpg',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.pulse.is/livechat/loader.js';
    script.setAttribute('data-live-chat-id', '686072039c750b834c01f507');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <NavbarComponent />

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/Santa-Cruz-Church-Bolivia.jpg')",
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
