import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaUser, FaShoppingBag } from 'react-icons/fa';
import './SideDrawer.css';

const SideDrawer = ({ show, click, cartItemCount }) => {
  const sideDrawerClass = ['sidedrawer'];

  if (show) {
    sideDrawerClass.push('show');
  }

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
        <li>
          <Link to="/login">Iniciar sesión</Link>
        </li>
        <li>
          <Link to="/register">Registrarse</Link>
        </li>
        <li>
          <Link to="/cart" className="sidedrawer__button cart">
            <FaShoppingBag /> Carrito {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </li>
        <li>
          <Link to="/profile" className="sidedrawer__button profile">
            <FaUser /> Perfil
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
