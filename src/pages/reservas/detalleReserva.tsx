import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ReservaService } from "../../services/reservaService";
import { Reserva } from "../../models/reserva";
import { Container, Card, Spinner } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/footer";

const DetalleReserva = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      new ReservaService()
        .getReservaById(Number(id))
        .then(setReserva)
        .catch(() => alert("Error al cargar la reserva"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!reserva) {
    return (
      <Container className="text-center my-5">
        <p>Reserva no encontrada.</p>
      </Container>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <Container className="my-5">
        <Card className="p-4 shadow rounded">
          <h2 className="mb-4">Detalle de Reserva</h2>
          <p><strong>Experiencia:</strong> {reserva.experiencia_titulo}</p>
          <p><strong>Fecha Reservada:</strong> {reserva.fecha_reservada}</p>
          <p><strong>Estado de Pago:</strong> {reserva.estado_pago}</p>
          {reserva.comprobante_pago && (
            <div>
              <strong>Comprobante:</strong><br />
              <img
                src={reserva.comprobante_pago as string}
                alt="Comprobante"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            </div>
          )}
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default DetalleReserva;
