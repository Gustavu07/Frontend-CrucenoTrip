import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Award, Globe2, PeopleFill } from 'react-bootstrap-icons';

const Nosotros: React.FC = () => {
  return (
    <div className="bg-light py-5">
      {/* Encabezado */}
      <Container className="text-center mb-5">
        <h1 className="fw-bold text-success display-4">Sobre Nosotros</h1>
        <p className="text-muted fs-5">
          Conectamos cultura, naturaleza y experiencias únicas en Santa Cruz de la Sierra.
        </p>
      </Container>

      <Container className="mb-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <Image
              src="/public/WhatsApp Image 2025-05-16 at 19.34.30.jpeg"
              alt="Turismo"
              fluid
              rounded
              className="shadow"
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold text-success">Misión</h2>
            <p className="text-muted">
              Promover el desarrollo sostenible de la industria turística de Santa Cruz de la Sierra,
              Bolivia, a través de servicios innovadores y de alta calidad que superen las expectativas
              de nuestros clientes y promuevan la conservación de la cultura, la naturaleza y el
              patrimonio de nuestra región.
            </p>

            <h2 className="fw-bold text-success mt-4">Visión</h2>
            <p className="text-muted">
              Ser la agencia de viajes líder en Santa Cruz de la Sierra, Bolivia, reconocida por su
              excelencia en la prestación de servicios turísticos, su contribución al desarrollo de la
              región y su compromiso con la satisfacción total de sus clientes.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Qué hacemos - Cards */}
      <Container>
        <h2 className="text-center text-success fw-bold mb-4">¿Qué hacemos?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Globe2 size={40} className="text-success mb-3" />
                <Card.Title className="fw-bold">Turismo Cultural</Card.Title>
                <Card.Text className="text-muted">
                  Organizamos experiencias únicas que conectan con las raíces culturales de la región.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <PeopleFill size={40} className="text-success mb-3" />
                <Card.Title className="fw-bold">Atención Personalizada</Card.Title>
                <Card.Text className="text-muted">
                  Nuestro equipo te acompaña antes, durante y después de cada viaje.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Award size={40} className="text-success mb-3" />
                <Card.Title className="fw-bold">Calidad Garantizada</Card.Title>
                <Card.Text className="text-muted">
                  Servicios certificados y enfocados en la excelencia para cada cliente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Nosotros;
