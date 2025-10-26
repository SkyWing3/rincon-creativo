import React, { useContext, useEffect, useMemo, useState } from 'react';
import './Checkout.css';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const Checkout = ({ cartItems = [], orderDetails = null, orderError = null }) => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(user || null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [profileError, setProfileError] = useState(null);

    useEffect(() => {
        if (!user) {
            setProfile(null);
            return;
        }

        const fetchProfile = async () => {
            setIsLoadingProfile(true);
            setProfileError(null);
            try {
                const response = await authService.getProfile();
                const payload = response?.data || response;
                setProfile(payload?.data ?? payload ?? null);
            } catch (error) {
                console.error('No se pudo obtener el perfil del usuario', error);
                setProfileError('No se pudieron cargar los datos del perfil.');
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [user]);

    const hasItems = cartItems.length > 0;
    const cartTotal = useMemo(() => {
        if (!hasItems) {
            return 0;
        }
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            return total + price * (item.quantity || 0);
        }, 0);
    }, [cartItems, hasItems]);

    if (!user) {
        return (
            <div className="checkout-container">
                <h2>Finalizar Compra</h2>
                <p>Debes iniciar sesión para finalizar la compra.</p>
            </div>
        );
    }

    const hasOrder = Boolean(orderDetails);
    const paymentInstructions = orderDetails?.payment_instructions;

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            <div className="checkout-content">
                <div className="user-data">
                    <h3>Datos de la Cuenta</h3>
                    {isLoadingProfile && <p className="checkout-status">Cargando datos del perfil...</p>}
                    {profileError && !isLoadingProfile && <p className="checkout-error">{profileError}</p>}
                    {!isLoadingProfile && !profileError && profile && (
                        <>
                            <p>
                                <strong>Nombre:</strong> {profile.first_name || 'N/D'}
                            </p>
                            <p>
                                <strong>Apellido paterno:</strong> {profile.f_last_name || 'N/D'}
                            </p>
                            <p>
                                <strong>Apellido materno:</strong> {profile.s_last_name || 'N/D'}
                            </p>
                            <p>
                                <strong>Correo electrónico:</strong> {profile.email || 'N/D'}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {profile.phone || 'N/D'}
                            </p>
                            <p>
                                <strong>Departamento:</strong> {profile.departamento || 'N/D'}
                            </p>
                            <p>
                                <strong>Ciudad:</strong> {profile.city || 'N/D'}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {profile.address || 'N/D'}
                            </p>
                        </>
                    )}
                    {!isLoadingProfile && !profileError && !profile && (
                        <p className="checkout-status">
                            No se encontraron datos del perfil. Intenta nuevamente más tarde.
                        </p>
                    )}
                </div>

                <div className="cart-summary">
                    <h3>Resumen del Carrito</h3>
                    {!hasItems && (
                        <p className="checkout-status">
                            Aún no tienes productos en tu carrito. Agrega artículos en el catálogo para continuar.
                        </p>
                    )}
                    {hasItems &&
                        cartItems.map((item) => {
                            const subtotal = Number(item.price || 0) * (item.quantity || 0);
                            return (
                                <div key={item.id} className="cart-item-summary">
                                    <span>
                                        {item.name} (x{item.quantity})
                                    </span>
                                    <span>Bs {subtotal.toFixed(2)}</span>
                                </div>
                            );
                        })}
                    {hasItems && (
                        <div className="cart-total-summary">
                            <strong>Total:</strong>
                            <span>Bs {cartTotal.toFixed(2)}</span>
                        </div>
                    )}
                    {orderError && <p className="checkout-error">{orderError}</p>}
                    {!hasOrder && !orderError && (
                        <p className="checkout-status">
                            Genera una orden desde el carrito para ver las instrucciones de pago.
                        </p>
                    )}
                    {hasOrder && paymentInstructions && (
                        <div className="payment-instructions">
                            <h4>Instrucciones de Pago</h4>
                            <p>
                                <strong>Activo:</strong> {paymentInstructions.asset}
                            </p>
                            <p>
                                <strong>Monto a pagar:</strong> {paymentInstructions.usdt_amount}{' '}
                                {paymentInstructions.asset}
                            </p>
                            <p>
                                <strong>Red:</strong> {paymentInstructions.network}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {paymentInstructions.usdt_address}
                            </p>
                            <p className="payment-note">{paymentInstructions.note}</p>
                            <a
                                className="binance-link"
                                href="https://www.binance.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ir a Binance Pay
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
