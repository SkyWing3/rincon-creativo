
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import './Landing.css';
import aboutImage from '../../../../src/duenas.png';

const Landing = ({ imageUrl = 'https://www.conartesanos.com/wp-content/uploads/2020/07/2.jpg' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="landing-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        variants={itemVariants}
        style={{
          background: `url('${imageUrl}') no-repeat center center / cover`,
        }}
      >
        <div className="hero-content">
          <h1>Rincón Creativo</h1>
          <p>Auténtica artesanía Boliviana, hecha con el corazón.</p>
          <Link to="/catalog" className="hero-button">
            Explora Nuestro Catálogo <FaArrowRight />
          </Link>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section className="about-section" variants={itemVariants}>
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre Nosotros</h2>
            <p>
              Rincón Creativo es un espacio dedicado a la promoción y venta de
              artesanías bolivianas. Trabajamos directamente con artesanos
              locales para ofrecerte productos únicos y de alta calidad,
              preservando nuestras tradiciones y cultura.
            </p>
          </div>
          <div className="about-image">
            <img
              src={aboutImage}
              alt="Sobre Nosotros"
            />
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section className="featured-section" variants={itemVariants}>
        <h2>Productos Destacados</h2>
        <div className="featured-products">
          {/* Product 1 */}
          <div className="featured-product">
            <img
              src="https://perucho.pe/wp-content/uploads/2025/08/alpaca-peruana-baby-peluche.webp"
              alt="Llama de peluche"
            />
            <h3>Llama de peluche</h3>
            <p>Hecha a mano con lana de llama, suave y adorable.</p>
          </div>
          {/* Product 2 */}
          <div className="featured-product">
            <img
              src="https://ichimaywari.com/wp-content/uploads/2023/01/MW-CDEC3-1895-RJ_1.jpg"
              alt="Toro de Pucara"
            />
            <h3>Toro de Pucara</h3>
            <p>Simbolo de proteccion y prosperidad en la cultura andina.</p>
          </div>
          {/* Product 3 */}
          <div className="featured-product">
            <img
              src="https://i.etsystatic.com/12705984/r/il/7066e4/3186828447/il_fullxfull.3186828447_nb57.jpg"
              alt="Tabla de ajedrez de madera"
            />
            <h3>Tabla de ajedrez de madera</h3>
            <p>Tallada a mano con maderas nativas de Bolivia.</p>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="testimonials-section" variants={itemVariants}>
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonials">
          {/* Testimonial 1 */}
          <div className="testimonial">
            <p>"¡Productos increíbles y de alta calidad! Me encanta la historia detrás de cada pieza."</p>
            <div className="testimonial-author">
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <span>- Cliente Satisfecho</span>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="testimonial">
            <p>"El servicio al cliente fue excepcional. Recibí mi pedido rápidamente y en perfectas condiciones."</p>
            <div className="testimonial-author">
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <span>- Cliente Contento</span>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Landing;
