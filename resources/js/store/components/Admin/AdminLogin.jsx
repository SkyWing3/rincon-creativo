import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Admin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { adminLogin } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await adminLogin(email, password);
        } catch (err) {
            let errorMessage = 'No se pudo iniciar sesión como administrador.';
            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-login-card">
            <h2>Acceso Administrador</h2>
            <p className="admin-login-subtitle">Ingresa tus credenciales para continuar.</p>
            {error && <div className="admin-error">{error}</div>}
            <form className="admin-form" onSubmit={handleSubmit}>
                <label className="admin-form-label" htmlFor="admin-email">Correo</label>
                <input
                    id="admin-email"
                    className="admin-form-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                />

                <label className="admin-form-label" htmlFor="admin-password">Contraseña</label>
                <input
                    id="admin-password"
                    className="admin-form-input"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting}
                />

                <button className="admin-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Ingresando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
