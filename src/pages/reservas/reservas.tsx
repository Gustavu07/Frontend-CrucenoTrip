import { useEffect, useState } from "react";
import { ReservaService } from "../../services/reservaService";
import { Reserva } from "../../models/reserva";
import { Container, Table, Spinner } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/footer";
import { Link } from "react-router";
import { URLS } from "../../navigation/constants";

const MisReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new ReservaService()
      .getMisReservas()
      .then(setReservas)
      .catch(() => alert("Error al obtener tus reservas"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <Container className="my-5">
        <h2 className="mb-4">Mis Reservas</h2>
        {reservas.length === 0 ? (
          <p>No tienes reservas actualmente.</p>
        ) : (
          <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Experiencia</th>
      <th>Fecha</th>
      <th>Pago</th>
    </tr>
  </thead>
  <tbody>
    {reservas.map((res) => (
      <tr key={res.id}>
        <td>
          <Link to={URLS.RESERVA_DETALLE.replace(":id", String(res.id))}>
            {res.experiencia_titulo}
          </Link>
        </td>
        <td>{res.fecha_reservada}</td>
        <td>{res.estado_pago}</td>
      </tr>
    ))}
  </tbody>
          </Table>
        )}

      </Container>
      <Footer />
    </div>
  );
};

export default MisReservas;
