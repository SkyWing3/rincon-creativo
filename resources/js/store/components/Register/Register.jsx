import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: '',
    f_last_name: '',
    s_last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    departamento: '',
    city: '',
    address: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    { label: 'Beni', value: 'Beni' },
    { label: 'Cochabamba', value: 'Cochabamba' },
    { label: 'Chuquisaca', value: 'Chuquisaca' },
    { label: 'La Paz', value: 'La Paz' },
    { label: 'Oruro', value: 'Oruro' },
    { label: 'Pando', value: 'Pando' },
    { label: 'Potosí', value: 'Potosi' },
    { label: 'Santa Cruz', value: 'Santa Cruz' },
    { label: 'Tarija', value: 'Tarija' }
  ];

  const strengthLabels = ['', 'muy débil', 'básica', 'sólida', 'excelente'];
  const strengthClasses = ['', 'is-weak', 'is-fair', 'is-good', 'is-strong'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError(null);
    }
    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setSubmitError('Las contraseñas no coinciden. Verifica e inténtalo nuevamente.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await register(formData);
      setSubmitSuccess(true);
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        (Array.isArray(error?.response?.data) ? error.response.data.join(' ') : null);

      setSubmitError(apiMessage || 'No se pudo completar el registro. Intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const strengthMessage = passwordStrength
    ? `Seguridad ${strengthLabels[passwordStrength]}`
    : 'Usa al menos 8 caracteres combinando mayúsculas, números y símbolos.';
  const strengthClass = strengthClasses[passwordStrength];

  return (
    <div className="register-layout">
      <div className="register-panel">
        <header className="register-header">
          <div className="header-badge">Rincón Creativo</div>
          <h1>Crea tu cuenta</h1>
          <p>Completa la información para comenzar.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="register-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="first_name">Nombre</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="f_last_name">Apellido paterno</label>
              <input
                id="f_last_name"
                name="f_last_name"
                type="text"
                autoComplete="family-name"
                value={formData.f_last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="s_last_name">Apellido materno</label>
              <input
                id="s_last_name"
                name="s_last_name"
                type="text"
                autoComplete="additional-name"
                value={formData.s_last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className={`password-meter ${strengthClass}`} aria-hidden="true">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className={index < passwordStrength ? 'is-active' : ''} />
                ))}
              </div>
              <p className={`password-hint ${strengthClass}`}>{strengthMessage}</p>
            </div>
            <div className="form-field">
              <label htmlFor="password_confirmation">Confirmar contraseña</label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="departamento">Departamento</label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {departments.map((dep) => (
                  <option key={dep.value} value={dep.value}>
                    {dep.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="city">Ciudad</label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
            <span className="terms-note">
              Al registrarte aceptas nuestros <a href="/terminos">Términos y Condiciones</a>.
            </span>
          </div>
        </form>

        {(submitError || submitSuccess) && (
          <div
            className={`form-alert ${submitError ? 'is-error' : 'is-success'}`}
            role="alert"
          >
            {submitError
              ? submitError
              : 'Registro exitoso. Estamos preparando tu experiencia.'}
          </div>
        )}

        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
