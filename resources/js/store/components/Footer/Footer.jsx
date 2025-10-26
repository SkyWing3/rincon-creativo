
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Explorar</h2>
              <Link to="/">Inicio</Link>
              <Link to="/catalog">Catálogo</Link>
              <Link to="/cart">Carrito</Link>
            </div>
            <div className="footer-link-items">
              <h2>Tu cuenta</h2>
              <Link to="/profile">Perfil</Link>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Crear cuenta</Link>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Redes Sociales</h2>
              <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon-link"><FaFacebook /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon-link"><FaInstagram /></a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon-link"><FaTwitter /></a>
                <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="social-icon-link"><FaPinterest /></a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube" className="social-icon-link"><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>
        <section className="footer-bottom">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              Rincon Creativo
            </Link>
          </div>
          <small className="website-rights">&copy; 2025 Rincon Creativo. Todos los derechos reservados.</small>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
