import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { URLS } from '../navigation/constants';

const NavbarComponent: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { doLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate(URLS.HOME);
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="shadow-sm border-bottom"
      style={{ zIndex: 1030, backgroundColor: '#198754' }}
    >
      <Navbar expand="md" variant="dark" expanded={expanded} className="px-3 py-2">
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate(URLS.HOME)}
            className="d-flex align-items-center gap-2 fw-semibold fs-4 text-white"
            style={{ cursor: 'pointer' }}
          >
            <img src="/CRUCEÑOTRIP.png" height={32} alt="Logo" />
            <span>Cruceño Trip</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="border-0 shadow-none"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-between align-items-center">
            <Nav className="ms-auto d-flex align-items-center gap-4">
              <Nav.Link onClick={() => navigate(URLS.EXPERIENCIAS_PUBLICAS)} className="text-white hover-icon">
                <i className="bi bi-map fs-5" />
              </Nav.Link>
              <Nav.Link onClick={() => navigate(URLS.LISTPUBLIC)} className="text-white hover-icon">
                <i className="bi bi-shop fs-5" />
              </Nav.Link>
              <Nav.Link onClick={() => navigate(URLS.RESERVA)} className="text-white hover-icon">
                <i className="bi bi-ticket fs-5" />
              </Nav.Link>

              <NavDropdown
                align="end"
                show={showDropdown}
                onToggle={() => setShowDropdown(!showDropdown)}
                title={<i className="bi bi-person-circle fs-5 text-white" />}
              >
                <NavDropdown.Item onClick={() => navigate(URLS.PERFIL)}>
                  <i className="bi bi-person-lines-fill me-2" /> Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.LIST)}>
                  <i className="bi bi-list-ul me-2" /> Lista de Experiencias
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.CREATE)}>
                  <i className="bi bi-plus-circle me-2" /> Crear Experiencia
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2" /> Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .hover-icon {
          cursor: pointer;
          transition: transform 0.2s ease, color 0.3s ease;
        }
        .hover-icon:hover {
          transform: translateY(-2px) scale(1.05);
          color: #ffc107 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default NavbarComponent;
