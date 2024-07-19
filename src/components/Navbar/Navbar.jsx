import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        Agendar
      </NavLink>
      <NavLink
        to="/appointments"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Agendamentos
      </NavLink>
    </nav>
  );
};

export default Navbar;
