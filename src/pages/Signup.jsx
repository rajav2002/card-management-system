import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! You can now log in.");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center">Sign Up</h2>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">Sign Up</Button>
        </Form>
        <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
      </Card>
    </Container>
  );
};

export default Signup;
