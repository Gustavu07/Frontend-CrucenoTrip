import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ReservaService } from "../../services/reservaService";
import { Reserva } from "../../models/reserva";
import { Container, Card, Spinner, Button, Alert } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/footer";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Importación correcta
 // ✅ Asegúrate de crear este archivo CSS

const DetalleReserva = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [pagado, setPagado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      new ReservaService()
        .getReservaById(Number(id))
        .then(setReserva)
        .catch(() => alert("Error al cargar la reserva"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleCrearSesion = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/crucenoTrip/create-checkout-session/",
        {
          reserva_id: reserva?.id,
          experiencia_titulo: reserva?.experiencia_titulo,
          cantidad: 1,
          monto: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCheckoutUrl(response.data.checkoutUrl);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          "Error al crear la sesión de pago: " +
            (error.response?.data?.error || error.message)
        );
      } else {
        setError("Error desconocido");
      }
    }
  };

  const handlePagoConfirmado = () => {
    setPagado(true);
  };

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
          <p>
            <strong>Experiencia:</strong> {reserva.experiencia_titulo}
          </p>
          <p>
            <strong>Fecha Reservada:</strong> {reserva.fecha_reservada}
          </p>
          <p>
            <strong>Estado de Pago:</strong> {reserva.estado_pago}
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          {!pagado && !checkoutUrl && reserva.estado_pago !== "pagado" && (
            <Button onClick={handleCrearSesion} variant="primary">
              Generar código QR para pagar
            </Button>
          )}

          {checkoutUrl && !pagado && (
            <div className="text-center my-4">
              <p>Escanea el código QR para pagar con Stripe:</p>
              <QRCodeCanvas value={checkoutUrl} size={256} />
              <div className="mt-3">
                <Button onClick={handlePagoConfirmado} variant="success">
                  Confirmar pago (simulado)
                </Button>
              </div>
            </div>
          )}

          {pagado && (
            <div className="text-center my-4">
              <div className="checkmark mx-auto mb-3"></div>
              <h3 className="text-success">✔ Pago confirmado</h3>
            </div>
          )}

          {reserva.comprobante_pago && (
            <div className="mt-4">
              <strong>Comprobante:</strong>
              <br />
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
