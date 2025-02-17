import { FaBars } from "react-icons/fa";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      <h4>Dashboard</h4>
    </header>
  );
};

export default Header;
