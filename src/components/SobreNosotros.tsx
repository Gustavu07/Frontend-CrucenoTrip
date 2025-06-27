import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SobreNosotros.css';

const SobreNosotros: React.FC = () => {
  return (
    <div className="sobre-nosotros-container">
      <Container>
        {/* Hero Section */}
        <Row className="hero-section mb-5">
          <Col>
            <h1 className="text-center display-4">Sobre Nosotros</h1>
            <p className="text-center lead">
              Descubre la historia detrás de CruceñoTrip y nuestra pasión por mostrar lo mejor de Santa Cruz
            </p>
          </Col>
        </Row>

        {/* Nuestra Historia */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h2 className="card-title">Nuestra Historia</h2>
                <p className="card-text">
                  CruceñoTrip nació de la pasión por mostrar la belleza y riqueza cultural de Santa Cruz. 
                  Nos dedicamos a crear experiencias únicas que conectan a los visitantes con la auténtica 
                  esencia de nuestra región.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h2 className="card-title">Nuestra Misión</h2>
                <p className="card-text">
                  Buscamos promover el turismo sostenible y responsable, mostrando los mejores destinos 
                  y experiencias que Santa Cruz tiene para ofrecer, mientras apoyamos a las comunidades 
                  locales.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Valores */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Nuestros Valores</h2>
            <Row>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <i className="fas fa-heart mb-3"></i>
                    <h3>Pasión</h3>
                    <p>Amamos lo que hacemos y lo transmitimos en cada experiencia</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <i className="fas fa-handshake mb-3"></i>
                    <h3>Compromiso</h3>
                    <p>Nos comprometemos con la excelencia en cada detalle</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <i className="fas fa-leaf mb-3"></i>
                    <h3>Sostenibilidad</h3>
                    <p>Promovemos un turismo responsable y sostenible</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Equipo */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Nuestro Equipo</h2>
            <Row>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="/images/team1.jpg" alt="Miembro del equipo" />
                  <Card.Body className="text-center">
                    <h3>María González</h3>
                    <p className="text-muted">Directora de Operaciones</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="/images/team2.jpg" alt="Miembro del equipo" />
                  <Card.Body className="text-center">
                    <h3>Carlos Rodríguez</h3>
                    <p className="text-muted">Guía Principal</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="/images/team3.jpg" alt="Miembro del equipo" />
                  <Card.Body className="text-center">
                    <h3>Ana Martínez</h3>
                    <p className="text-muted">Coordinadora de Experiencias</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SobreNosotros; 