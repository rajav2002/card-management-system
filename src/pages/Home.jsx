import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaUsers, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const Home = () => {
  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <h2 className="mb-4 fw-bold">📊 Dashboard Overview</h2>

      {/* Stats Cards Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-lg border-0 text-white bg-primary">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Total Events</h5>
                <h2>24</h2>
              </div>
              <FaCalendarAlt size={40} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-lg border-0 text-white bg-success">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Total Transactions</h5>
                <h2>120</h2>
              </div>
              <FaMoneyBillWave size={40} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-lg border-0 text-white bg-danger">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Users Registered</h5>
                <h2>56</h2>
              </div>
              <FaUsers size={40} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions Section */}
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h5 className="mb-3 fw-bold">📜 Recent Transactions</h5>
          <Table striped bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Event</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Music Festival</td>
                <td>$50</td>
                <td className="text-success fw-bold">✔ Completed</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>Business Conference</td>
                <td>$100</td>
                <td className="text-warning fw-bold">⌛ Pending</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Michael Brown</td>
                <td>Sports Meet</td>
                <td>$75</td>
                <td className="text-success fw-bold">✔ Completed</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
