import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <span className="fs-3 me-2">&lt;/&gt;</span>
              <div>
                <h5 className="m-0">Cruceño Trip</h5>
              </div>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">SOBRE NOSOTROS</h6>
            <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">SÍGUENOS</h6>
            <div className="d-flex gap-2">
              <a href="https://www.facebook.com/people/Cruce%C3%B1o-Trip/61575843273593/" className="btn btn-outline-light btn-sm">
                <Facebook />
              </a>
              <a href="#" className="btn btn-outline-light btn-sm">
                <Instagram />
              </a>
              <a href="#" className="btn btn-outline-light btn-sm">
                <Twitter />
              </a>
              <a href="#" className="btn btn-outline-light btn-sm">
                <Youtube />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />
        <div className="text-center">
          <small>&copy; 2025 <strong>SLee Dw</strong> - Todos los Derechos Reservados.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
