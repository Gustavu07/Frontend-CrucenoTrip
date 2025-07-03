import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, MusicNote, Youtube } from "react-bootstrap-icons";
import "../styles/footer.css"; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <span className="fs-2 me-2 text-success">&lt;/&gt;</span>
              <h4 className="m-0">Cruceño Trip</h4>
            </div>
            <p className="text-muted small">Explora Bolivia de una forma única con nuestra plataforma de turismo local.</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Sobre Nosotros</h6>
            <p className="small">
              Promovemos el turismo local conectando visitantes con experiencias auténticas y culturales en Santa Cruz y otras regiones de Bolivia.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Síguenos</h6>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/people/Cruce%C3%B1o-Trip/61575843273593/" className="icon-link" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/crucenotrip_scz?igsh=aDFoNXA5c2lpeWU5" className="icon-link">
                <Instagram />
              </a>
              <a href="https://www.tiktok.com/@crucenotrip_scz?_t=ZM-8xfjSoJTYrV&_r=1" className="icon-link">
              <MusicNote />
              </a>
              <a href="https://www.youtube.com/@Cruce%C3%B1oTrip" className="icon-link">
                <Youtube />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />
        <div className="text-center">
          <small className="text-muted">&copy; 2025 <strong>Cruceño Trip</strong> - Todos los Derechos Reservados.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
