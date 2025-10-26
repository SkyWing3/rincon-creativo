import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

    const handleFinalizePurchase = async () => {
        if (isSubmitting) {
            return;
        }

        setCheckoutError(null);

        if (!user) {
            navigate('/login');
            return;
        }

        if (!hasItems) {
            setCheckoutError('No hay productos en el carrito.');
            return;
        }

        if (typeof onCheckout !== 'function') {
            navigate('/checkout');
            return;
        }

        try {
            setIsSubmitting(true);
            await onCheckout();
            navigate('/checkout');
        } catch (error) {
            const message = error?.message || 'No se pudo finalizar la compra.';
            setCheckoutError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="shopping-cart-container">
            <h2>Carrito de Compras</h2>
            {!hasItems ? (
                <p className="cart-empty">No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cartItems.map((item) => {
                            const subtotal = Number(item.price || 0) * (item.quantity || 0);
                            return (
                                <li key={item.id} className="cart-item">
                                    <div className="item-info">
                                        <img src={item.image} alt={item.name} />
                                        <span className="item-name">{item.name}</span>
                                    </div>
                                    <div className="item-details">
                                        <div className="quantity-control">
                                            <button onClick={() => onUpdateQuantity(item, item.quantity - 1)}>
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}>
                                                +
                                            </button>
                                        </div>
                                        <span>Bs {subtotal.toFixed(2)}</span>
                                        <button
                                            onClick={() => onRemoveFromCart(item)}
                                            className="remove-btn"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {checkoutError && <p className="cart-error">{checkoutError}</p>}
                    <div className="cart-actions">
                        <button
                            type="button"
                            className="pay-btn"
                            onClick={handleFinalizePurchase}
                            disabled={!hasItems || isSubmitting}
                        >
                            {isSubmitting ? 'Procesando...' : 'Comprar'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
