
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
              <h2>Sobre Nosotros</h2>
              <Link to="/about">Nuestra Historia</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/careers">Trabaja con Nosotros</Link>
            </div>
            <div className="footer-link-items">
              <h2>Atención al Cliente</h2>
              <Link to="/contact">Contacto</Link>
              <Link to="/faq">Preguntas Frecuentes</Link>
              <Link to="/shipping">Envíos y Devoluciones</Link>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Redes Sociales</h2>
              <div className="social-icons">
                <a href="/" target="_blank" aria-label="Facebook" className="social-icon-link"><FaFacebook /></a>
                <a href="/" target="_blank" aria-label="Instagram" className="social-icon-link"><FaInstagram /></a>
                <a href="/" target="_blank" aria-label="Twitter" className="social-icon-link"><FaTwitter /></a>
                <a href="/" target="_blank" aria-label="Pinterest" className="social-icon-link"><FaPinterest /></a>
                <a href="/" target="_blank" aria-label="Youtube" className="social-icon-link"><FaYoutube /></a>
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
