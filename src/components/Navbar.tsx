import React, { useState } from 'react';
import { Container, Nav, Dropdown } from 'react-bootstrap';

import { motion } from 'framer-motion';

const NavbarComponent: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="shadow-sm border-bottom"
      style={{ backgroundColor: '#2e7d32' }} 
    >
      <Container fluid className="d-flex justify-content-between align-items-center py-2 px-4">
        <div className="text-white fw-bold fs-4">Cruceño Trip</div>

        <Nav className="d-flex gap-4 text-white">
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

          {/* Perfil con dropdown */}
          <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}
            align="end"
          >
            <Dropdown.Toggle
              as="div"
              className="text-white text-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-person fs-5 d-block position-relative"></i>
              <small>Cruceño</small>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/perfil">Perfil</Dropdown.Item>
              <Dropdown.Item href="#/cerrar-sesion">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </motion.div>
  );
};

export default NavbarComponent;
