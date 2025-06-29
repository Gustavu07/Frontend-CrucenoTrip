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
      style={{ backgroundColor: '#2e7d32' }}
    >
      <Navbar expand="md" variant="dark" expanded={expanded} className="px-3">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold fs-4">
            Cruceño Trip
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-4 text-white">
              <Nav.Item className="text-center">
                <i className="bi bi-heart fs-5 d-block"></i>
                <small>Favoritos</small>
              </Nav.Item>

              <Nav.Item className="text-center">
                <i className="bi bi-cart fs-5 d-block"></i>
                <small>Carrito</small>
              </Nav.Item>

              <Nav.Item className="text-center">
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
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-person fs-5 d-block position-relative"></i>
                  <small>Cruceño</small>
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => window.location.replace("/perfil")}>Perfil</Dropdown.Item>

                  <Dropdown.Item onClick={doLogout} >Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavbarComponent;
