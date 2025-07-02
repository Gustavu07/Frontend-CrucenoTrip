import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { URLS } from '../navigation/constants';

const NavbarAdminComponent: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { doLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="shadow-sm border-bottom"
      style={{
        background: 'linear-gradient(to right, #1b1f23, #2e2e2e)',
        zIndex: 1030,
      }}
    >
      <Navbar expand="md" variant="dark" expanded={expanded} className="px-3 py-2">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold fs-4">
            <i className="bi bi-speedometer2 me-2" /> Panel de Administración
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-md-center gap-3 flex-column flex-md-row text-white">
              <Nav.Link className="text-white" onClick={() => navigate(URLS.Admin.LISTUSER)}>
                <i className="bi bi-people-fill me-1" /> Usuarios
              </Nav.Link>

              <NavDropdown title={<><i className="bi bi-box-seam me-1" /> Productos</>} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Productos.LIST)}>Lista</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Productos.CREATE)}>Crear</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<><i className="bi bi-geo-alt-fill me-1" /> Experiencias</>} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.LIST)}>Lista</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.CREATE)}>Crear</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="text-white" onClick={() => navigate(URLS.Admin.LISTCATEGORIA_PRODUCTO)}>
                <i className="bi bi-tags me-1" /> Cat. Productos
              </Nav.Link>

              <Nav.Link className="text-white" onClick={() => navigate(URLS.Admin.LISTCATEGORIA_EXPERIENCIA)}>
                <i className="bi bi-compass me-1" /> Cat. Experiencias
              </Nav.Link>

              <NavDropdown
                align="end"
                title={
                  <span className="d-flex align-items-center">
                    <i className="bi bi-person-circle fs-5 me-1" />
                    <span className="d-none d-md-inline">Admin</span>
                  </span>
                }
                className="text-white"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={() => navigate(URLS.PERFIL)}>
                  <i className="bi bi-person-lines-fill me-2" />
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={doLogout}>
                  <i className="bi bi-box-arrow-right me-2" />
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavbarAdminComponent;
