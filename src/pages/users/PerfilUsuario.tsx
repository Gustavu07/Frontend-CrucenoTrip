import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { AuthService } from '../../services/AuthService';
import NavbarComponent from "../../components/Navbar";
import { UserInfoResponse } from '../../models/dto/UserInfoResponse';
import { PersonCircle, EnvelopeFill, TelephoneFill, ShieldLockFill } from 'react-bootstrap-icons';

const PerfilUsuario = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new AuthService()
      .me()
      .then(setUserInfo)
      .catch(() => alert("Error al cargar el perfil"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center my-5">
          <Spinner animation="border" variant="success" />
        </Container>
      </>
    );
  }

  if (!userInfo) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center my-5">No se pudo cargar el perfil.</Container>
      </>
    );
  }

  const { user, perfil } = userInfo;

  return (
    <>
      <NavbarComponent />
      <Container className="my-5 d-flex justify-content-center">
        <Card className="p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="text-center mb-4">
            <PersonCircle size={60} className="text-success" />
            <h3 className="text-success fw-bold mt-3">Perfil del Usuario</h3>
            <Badge bg="secondary" className="mt-2 text-uppercase">{perfil.rol}</Badge>
          </div>

          <Row className="mb-3">
            <Col xs={1}><ShieldLockFill className="text-success" /></Col>
            <Col>
              <strong>Usuario:</strong>
              <div>{user.username}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={1}><EnvelopeFill className="text-success" /></Col>
            <Col>
              <strong>Correo:</strong>
              <div>{user.email}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={1}><TelephoneFill className="text-success" /></Col>
            <Col>
              <strong>Teléfono:</strong>
              <div>{perfil.telefono}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={1}><i className="bi bi-person-lines-fill text-success" /></Col>
            <Col>
              <strong>Nombre completo:</strong>
              <div>{user.first_name} {user.last_name}</div>
            </Col>
          </Row>

          {/* Licencia como Card */}
          {typeof perfil.licencias === "string" && /\.(jpg|jpeg|png|gif)$/i.test(perfil.licencias) && (
            <Row className="mb-3">
              <Col xs={1}><i className="bi bi-card-image text-success" /></Col>
              <Col>
                <strong>Licencia:</strong>
                <Card
                  className="shadow-sm mt-2 border-0"
                  style={{ maxWidth: '300px', borderRadius: '12px', overflow: 'hidden' }}
                >
                  <Card.Img
                    src={
                      perfil.licencias.startsWith('/media/')
                        ? `http://127.0.0.1:8000${perfil.licencias}`
                        : perfil.licencias
                    }
                    alt="Licencia del guía"
                    style={{
                      height: '180px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </Card>
              </Col>
            </Row>
          )}
        </Card>
      </Container>
    </>
  );
};

export default PerfilUsuario;
