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
      style={{ backgroundColor: '#1f2937', zIndex: 1030 }}
    >
      <Navbar expand="md" variant="dark" expanded={expanded} className="px-3 py-2">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold fs-4 d-flex align-items-center gap-2">
            <i className="bi bi-speedometer2" />
            <span>Panel de Administración</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="border-0"
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3 flex-column flex-md-row text-white">

              {/* Usuarios */}
              <NavDropdown title={<i className="bi bi-people-fill fs-5" />} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.LISTUSER)}>
                  Lista de Usuarios
                </NavDropdown.Item>
              </NavDropdown>

              {/* Productos */}
              <NavDropdown title={<i className="bi bi-box-seam fs-5" />} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Productos.LIST)}>
                  Lista de Productos
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Productos.CREATE)}>
                  Crear Producto
                </NavDropdown.Item>
              </NavDropdown>

              {/* Experiencias */}
              <NavDropdown title={<i className="bi bi-geo-alt-fill fs-5" />} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.LIST)}>
                  Lista de Experiencias
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.Experiencias.CREATE)}>
                  Crear Experiencia
                </NavDropdown.Item>
              </NavDropdown>

              {/* Categorías */}
              <NavDropdown title={<i className="bi bi-tags fs-5" />} menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.LISTCATEGORIA_PRODUCTO)}>
                  Categorías de Productos
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(URLS.Admin.LISTCATEGORIA_EXPERIENCIA)}>
                  Categorías de Experiencias
                </NavDropdown.Item>
              </NavDropdown>

              {/* Perfil y logout */}
              <NavDropdown
                align="end"
                title={<i className="bi bi-person-circle fs-5" />}
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={() => navigate(URLS.PERFIL)}>
                  <i className="bi bi-person-lines-fill me-2" /> Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={doLogout}>
                  <i className="bi bi-box-arrow-right me-2" /> Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .nav-item-modern {
          transition: all 0.3s ease;
        }
        .nav-item-modern:hover {
          color: #60a5fa !important;
        }
        .dropdown-menu {
          background-color: #1f2937 !important;
        }
        .dropdown-item:hover {
          background-color: #374151 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default NavbarAdminComponent;
