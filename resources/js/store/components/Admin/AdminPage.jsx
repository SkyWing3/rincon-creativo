import React, { useContext } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { AuthContext } from '../../context/AuthContext';
import './Admin.css';

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = user && user.role && user.role !== 'client';
    const isClient = user && user.role === 'client';

    if (isAdmin) {
        return <div className="admin-page"><AdminDashboard /></div>;
    }

    if (isClient) {
        return (
            <div className="admin-page">
                <div className="admin-login-card">
                    <h2>Acceso restringido</h2>
                    <p className="admin-login-subtitle">
                        Tu cuenta actual no tiene permisos de administrador. Por favor cierra sesión e intenta nuevamente con un usuario autorizado.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <AdminLogin />
        </div>
    );
};

export default AdminPage;
