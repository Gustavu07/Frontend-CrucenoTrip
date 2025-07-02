import React, { useState } from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { motion } from 'framer-motion';

const NavbarComponent: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { doLogout } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="shadow-sm border-bottom"
      style={{
        background: 'linear-gradient(to right, #2e7d32, #388e3c)',
        zIndex: 1030,
      }}
    >
      <Navbar expand="md" variant="dark" expanded={expanded} className="px-3 py-2">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold fs-4">
            <i className="bi bi-globe-americas me-2" /> Cruceño Trip
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-4 text-white">
              <Nav.Item className="text-center hover-icon">
                <i className="bi bi-heart fs-5 d-block"></i>
                <small>Favoritos</small>
              </Nav.Item>

              <Nav.Item className="text-center hover-icon">
                <i className="bi bi-cart fs-5 d-block"></i>
                <small>Carrito</small>
              </Nav.Item>

              <Nav.Item className="text-center hover-icon">
                <i className="bi bi-ticket fs-5 d-block"></i>
                <small>Reservas</small>
              </Nav.Item>

              <Dropdown
                show={showDropdown}
                onToggle={() => setShowDropdown(!showDropdown)}
                align="end"
              >
                <Dropdown.Toggle
                  as="div"
                  className="text-white text-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '6px 10px',
                    borderRadius: '30px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className="bi bi-person-circle fs-4" />
                  <div className="small">Cruceño</div>
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-3 shadow-sm mt-2">
                  <Dropdown.Item
                    as="button"
                    onClick={() => window.location.replace("/perfil")}
                  >
                    <i className="bi bi-person-lines-fill me-2" />
                    Perfil
                  </Dropdown.Item>
                  <Dropdown.Item onClick={doLogout}>
                    <i className="bi bi-box-arrow-right me-2" />
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .hover-icon {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .hover-icon:hover {
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>
    </motion.div>
  );
};

export default NavbarComponent;
