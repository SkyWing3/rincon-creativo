
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaShoppingBag, FaSun, FaMoon } from 'react-icons/fa';
import logo from '../../logo.svg';
import './Navbar.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ cartItemCount }) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prevState) => !prevState);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Rincon Creativo" className="navbar-icon" />
          Rincon Creativo
        </Link>
        <div className="menu-icon" onClick={drawerToggleClickHandler}>
          <FaBars />
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog" className="nav-links">
              Catálogo
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-links">
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" onClick={logout} className="nav-links">
                  Cerrar sesión
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Iniciar sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav-icons">
          <div className="nav-icon-link" onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
          <Link to="/cart" className="nav-icon-link">
            <FaShoppingBag />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <Link to={user ? "/profile" : "/login"} className="nav-icon-link">
            <FaUser />
          </Link>
        </div>
      </div>
      <SideDrawer show={sideDrawerOpen} click={backdropClickHandler} cartItemCount={cartItemCount} />
      {sideDrawerOpen && <Backdrop click={backdropClickHandler} />}
    </nav>
  );
};

export default Navbar;
