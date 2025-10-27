import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import Orders from '../Orders/Orders';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const DEFAULT_PROFILE_PICTURE = 'https://www.vecteezy.com/png/24983914-simple-user-default-icon';

const normalizeProfileData = (profile) => {
    const data = profile?.data ?? profile ?? {};

    return {
        id: data.id ?? null,
        nombre: data.first_name ?? '',
        apellidoPaterno: data.f_last_name ?? '',
        apellidoMaterno: data.s_last_name ?? '',
        departamento: data.departamento ?? '',
        ciudad: data.city ?? '',
        telefono: data.phone ?? '',
        correo: data.email ?? '',
        direccion: data.address ?? '',
        profilePicture: data.photo_url || DEFAULT_PROFILE_PICTURE,
        createdAt: data.created_at ?? '',
        ordersCount: data.orders_count ?? 0,
        orders: Array.isArray(data.orders) ? data.orders : [],
    };
};
const Profile = () => {
    const { user: sessionUser } = useContext(AuthContext);
    const [user, setUser] = useState(() => (sessionUser ? normalizeProfileData(sessionUser) : null));
    const [editedUser, setEditedUser] = useState(() =>
        sessionUser ? normalizeProfileData(sessionUser) : null,
    );
    const [orders, setOrders] = useState(() => {
        if (!sessionUser) {
            return [];
        }
        const normalized = normalizeProfileData(sessionUser);
        return normalized.orders;
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await authService.getProfile();
                if (!isMounted) return;

                const normalized = normalizeProfileData(response.data);
                setUser(normalized);
                setEditedUser(normalized);
                setOrders(normalized.orders);
            } catch (err) {
                if (!isMounted) return;
                console.error('Error fetching profile', err);
                setError('No se pudo cargar el perfil. Inténtalo nuevamente.');
                setUser(null);
                setEditedUser(null);
                setOrders([]);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        // Always hydrate from backend to keep session in sync
        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!sessionUser) {
            setUser(null);
            setEditedUser(null);
            setOrders([]);
            return;
        }

        const normalized = normalizeProfileData(sessionUser);
        setUser(normalized);
        setEditedUser(normalized);
        setOrders(normalized.orders);
    }, [sessionUser]);

    const handleEdit = () => {
        if (!user) return;
        setEditedUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setEditedUser(user);
        }
    };

    const handleSave = () => {
        if (!editedUser) return;
        setUser(editedUser);
        setIsEditing(false);
        console.log('Saving user data:', editedUser);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const displayedUser = isEditing ? editedUser : user;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-sidebar">
                    <img
                        src={displayedUser?.profilePicture || DEFAULT_PROFILE_PICTURE}
                        alt="Perfil"
                        className="profile-picture"
                    />
                    <h2>{`${displayedUser?.nombre || ''} ${displayedUser?.apellidoPaterno || ''}`.trim()}</h2>
                    <p>{displayedUser?.correo || 'Sin correo disponible'}</p>
                </div>
                <div className="profile-main">
                    <div className="profile-header">
                        <h1>Perfil de Usuario</h1>
                    </div>
                    {loading ? (
                        <p className="profile-status">Cargando perfil...</p>
                    ) : error ? (
                        <p className="profile-status profile-status-error">{error}</p>
                    ) : (
                        <div className="profile-details">
                            <div className="detail-item">
                                <FaUser className="icon" />
                                <div>
                                    <span>Nombre</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={editedUser?.nombre || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.nombre || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaUser className="icon" />
                                <div>
                                    <span>Apellido Paterno</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="apellidoPaterno"
                                            value={editedUser?.apellidoPaterno || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.apellidoPaterno || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaUser className="icon" />
                                <div>
                                    <span>Apellido Materno</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="apellidoMaterno"
                                            value={editedUser?.apellidoMaterno || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.apellidoMaterno || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaEnvelope className="icon" />
                                <div>
                                    <span>Correo Electrónico</span>
                                    <p>{user?.correo || 'Sin información'}</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaPhone className="icon" />
                                <div>
                                    <span>Teléfono</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={editedUser?.telefono || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.telefono || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaMapMarkerAlt className="icon" />
                                <div>
                                    <span>Departamento</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="departamento"
                                            value={editedUser?.departamento || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.departamento || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail-item">
                                <FaCity className="icon" />
                                <div>
                                    <span>Ciudad</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="ciudad"
                                            value={editedUser?.ciudad || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>{user?.ciudad || 'Sin información'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="profile-actions">
                        {isEditing ? (
                            <div>
                                <button onClick={handleSave} className="edit-btn" disabled={!editedUser}>
                                    Guardar Cambios
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="edit-btn edit-btn--secondary"
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <button onClick={handleEdit} className="edit-btn" disabled={!user}>
                                    Editar Perfil
                                </button>
                                <button
                                    onClick={() => setShowOrders(true)}
                                    className="edit-btn"
                                    disabled={!orders.length}
                                >
                                    Mis Pedidos
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Orders show={showOrders} onClose={() => setShowOrders(false)} orders={orders} />
        </div>
    );
};

export default Profile;
