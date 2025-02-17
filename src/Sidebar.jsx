import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaCreditCard, FaExchangeAlt, FaCog, FaSignOutAlt, FaUserCircle  } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
      };
    return (
        <div className="sidebar d-flex flex-column">
            {/* Logo Section */}
            <Navbar.Brand className="logo text-white text-center py-3">
            <FaUserCircle className="user-icon" /> {/* User icon instead of image */}
                <h5>Rajav Jha</h5>
            </Navbar.Brand>

            {/* Navigation Links */}
            <Nav className="flex-column flex-grow-1">
                <Nav.Item>
                    <Link to="/Home" className="nav-link">
                        <FaHome className="icon" /> Home
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/cards" className="nav-link">
                        <FaCreditCard className="icon" /> Cards
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/transactions" className="nav-link">
                        <FaExchangeAlt className="icon" /> Transactions
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/settings" className="nav-link">
                        <FaCog className="icon" /> Settings
                    </Link>
                </Nav.Item>
            </Nav>

            {/* Logout Button */}
            <Nav.Item className="logout">
                <Link to="/logout" className="nav-link" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" /> Logout
                </Link>
            </Nav.Item>
        </div>
    );
};

export default Sidebar;
