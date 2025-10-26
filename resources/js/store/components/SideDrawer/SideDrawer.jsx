import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaUser, FaShoppingBag, FaMoon, FaSun } from 'react-icons/fa';
import './SideDrawer.css';

const SideDrawer = ({
  show,
  click,
  cartItemCount = 0,
  onToggleTheme,
  isDarkMode,
  user,
  onLogout,
}) => {
  const sideDrawerClass = ['sidedrawer'];

  if (show) {
    sideDrawerClass.push('show');
  }

  const handleLogout = (event) => {
    if (onLogout) {
      onLogout(event);
    }
  };

  const handleThemeToggle = (event) => {
    event.stopPropagation();
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  return (
    <div className={sideDrawerClass.join(' ')}>
      <div className="sidedrawer__header">
        <div className="sidedrawer__logo">
          <Link to="/" onClick={click}>
            Rincon Creativo
          </Link>
        </div>
        <div className="sidedrawer__close" onClick={click}>
          <FaTimes />
        </div>
      </div>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/catalog">Catálogo</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <button type="button" className="sidedrawer__button profile" onClick={handleLogout}>
                <FaUser /> Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart" className="sidedrawer__button cart">
            <FaShoppingBag /> Carrito {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </li>
        <li className="sidedrawer__theme">
          <button type="button" onClick={handleThemeToggle} className="sidedrawer__button theme">
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
