import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./pages/Home";
import CardList from "./pages/CardList";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hideSidebar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <Container fluid>
      {!hideSidebar && <Header toggleSidebar={toggleSidebar} />}
      <Row>
        {!hideSidebar && isSidebarOpen && (
          <Col md={3} className="p-0">
            <Sidebar />
          </Col>
        )}
        <Col md={hideSidebar ? 12 : isSidebarOpen ? 9 : 12} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/cards" element={<PrivateRoute element={<CardList />} />} />
          <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
