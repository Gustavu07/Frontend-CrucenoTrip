import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Experiencia } from '../../models/experiencia';
import { ExperienciaService } from '../../services/experienciaService';
import { URLS } from '../../navigation/constants';
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/footer';
import '../../styles/banner.css';

const ExperienciasPublicas = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    new ExperienciaService()
      .getAll()
      .then(setExperiencias)
      .catch(() => alert('Error al cargar las experiencias'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      {/* Banner superior */}
      <div
        className="banner-lugares text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/2f28ecb9b611b548d13861c5f6359ed1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
        }}
      >
        <h1 className="text-center display-4 fw-bold bg-dark bg-opacity-50 px-4 py-2 rounded">
          Explora experiencias inolvidables
        </h1>
      </div>

      {/* Contenido */}
      <Container className="py-5">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {experiencias.map((exp) => (
              <Col key={exp.id} xs={12} sm={6} md={4} lg={4}>
                <Card
                  className="h-100 shadow-sm border-0"
                  onClick={() =>
                    navigate(URLS.EXPERIENCIA_DETALLE.replace(':id', exp.id?.toString() ?? ''))
                  }
                  style={{ cursor: 'pointer', borderRadius: '15px' }}
                >
                  {exp.imagen_experiencia && (
                    <Card.Img
                      variant="top"
                      src={exp.imagen_experiencia as string}
                      alt={exp.titulo}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="text-success fw-bold">{exp.titulo}</Card.Title>
                    <Card.Text className="text-muted">{exp.ubicacion}</Card.Text>
                    <Card.Text className="text-success fw-semibold">
                      Bs. {Number(exp.precio_por_persona).toFixed(2)}
                    </Card.Text>
                    <Card.Text className="text-secondary small">
                      {exp.descripcion.length > 100
                        ? exp.descripcion.slice(0, 100) + '...'
                        : exp.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ExperienciasPublicas;
