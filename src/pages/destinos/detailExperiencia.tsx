import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AxiosError } from "axios";
import { Container, Row, Col, Card, Spinner, Button} from 'react-bootstrap';
import { GeoAltFill, ClockFill, Translate, TagFill, CashCoin} from 'react-bootstrap-icons';
import { Experiencia } from '../../models/experiencia';
import { ExperienciaService } from '../../services/experienciaService';
import { CarritoReservaService } from '../../services/carritoReservaService';
import { ReservaService } from "../../services/reservaService";
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/footer';

const DetalleExperiencia = () => {
  const { id } = useParams();
  const [experiencia, setExperiencia] = useState<Experiencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      new ExperienciaService()
        .getById(Number(id))
        .then(setExperiencia)
        .catch(() => alert("Error al cargar la experiencia"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleReservar = async () => {
    try {
      const carritoService = new CarritoReservaService();
      const reservaService = new ReservaService();
  
      // Obtener o crear carrito
      const carrito = await carritoService.getMiCarrito().catch(async (error) => {
        if (error.message.includes("No se encontró")) {
          return await carritoService.crearCarrito();
        }
        throw error;
      });
  
      // Crear reserva
      if (experiencia) {
        const nuevaReserva = {
          carrito: carrito.id!,
          experiencia: experiencia.id!,
          fecha_reservada: new Date().toISOString().split("T")[0], // ejemplo: fecha de hoy
        };
  
        await reservaService.createReserva(nuevaReserva);
        alert("¡Reserva añadida exitosamente!");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      const message =
        err.response?.data?.detail || err.message || "Error inesperado";
      alert(message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!experiencia) {
    return (
      <Container className="text-center my-5">
        <p>Experiencia no encontrada.</p>
      </Container>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              {experiencia.imagen_experiencia && (
                <Card.Img
                  variant="top"
                  src={experiencia.imagen_experiencia as string}
                  alt={experiencia.titulo}
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              )}
              <Card.Body className="p-4">
                <h2 className="text-success fw-bold mb-4">
                  {experiencia.titulo}
                </h2>

                <Row>
                  <Col md={6} className="mb-3">
                    <p>
                      <GeoAltFill className="me-2 text-secondary" />{" "}
                      <strong>Ubicación:</strong> {experiencia.ubicacion}
                    </p>
                    <p>
                      <ClockFill className="me-2 text-secondary" />{" "}
                      <strong>Duración:</strong> {experiencia.duracion}
                    </p>
                    <p>
                      <Translate className="me-2 text-secondary" />{" "}
                      <strong>Idiomas:</strong> {experiencia.idiomas}
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p>
                      <TagFill className="me-2 text-secondary" />
                      <strong>Categorías:</strong>{" "}
                      {experiencia.categorias
                        ?.map((c) => c.nombre)
                        .join(", ")}
                    </p>
                    <p>
                      <CashCoin className="me-2 text-secondary" />
                      <strong>Precio:</strong>{" "}
                      <span className="text-success fw-bold">
                        Bs. {Number(experiencia.precio_por_persona).toFixed(2)}
                      </span>
                    </p>
                  </Col>
                </Row>

                <hr className="my-4" />

                <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                  {experiencia.descripcion}
                </p>

                <div className="text-end mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="px-4 rounded-pill"
                    onClick={handleReservar}
                  >
                    Reservar ahora
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default DetalleExperiencia;
