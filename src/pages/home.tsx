import React from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Map, Marker } from '@vis.gl/react-google-maps';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/footer';

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
    imagen: '/public/Santa-Cruz-Church-Bolivia.jpg',
  },
  {
    id: 2,
    nombre: 'Parque El Arenal',
    descripcion: 'Un oasis urbano con laguna, arte y vegetación.',
    imagen: '/public/Santa-Cruz-Church-Bolivia.jpg',
  },
  {
    id: 3,
    nombre: 'Cascadas Espejillos',
    descripcion: 'Un centro ecológico con mariposario, aviario y piscinas.',
    imagen: '/public/2f28ecb9b611b548d13861c5f6359ed1.jpg',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavbarComponent /> 

      <div
        className="d-flex align-items-center"
        style={{
          backgroundImage: "url('/Santa-Cruz-Church-Bolivia.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container>
          <h1 className="fw-bold display-4">Bienvenido a Santa Cruz de la Sierra</h1>
          <p className="lead">Descubre las mejores experiencias con Cruceo Trip</p>
          <Button
            variant="success"
            className="mt-3 px-4 py-2 fw-bold"
            onClick={() => navigate('/lugares')}
          >
            Explorar
          </Button>
        </Container>
      </div>

      <Container fluid className="my-5">
        <h2 className="fw-bold text-success text-center mb-4">Lugares más visitados este mes</h2>
        <Row className="g-4 justify-content-center px-3">
          {lugares.map((lugar) => (
            <Col key={lugar.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <Card.Img
                  variant="top"
                  src={lugar.imagen}
                  alt={lugar.nombre}
                  style={{
                    height: '180px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-success fw-bold">{lugar.nombre}</Card.Title>
                  <Card.Text>{lugar.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* <Container fluid className="my-5">
        <h2 className="fw-bold text-success text-center mb-4">Nuestra Ubicación</h2>
        <div
          style={{
            height: '400px',
            width: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <Map
            center={{ lat: -17.7833, lng: -63.1821 }}
            zoom={14}
            mapId=""
            style={{ height: '100%', width: '100%' }}
          >
            <Marker position={{ lat: -17.772945, lng: -63.193703 }} />
          </Map>
        </div>
      </Container> */}

      <Footer />
    </>
  );
};

export default Home;
