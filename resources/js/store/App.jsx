import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Landing from './components/Landing/Landing';
import Catalog from './components/Catalog/Catalog';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/Checkout/Checkout';
import Analytics from './components/Analytics/Analytics';
import AdminPage from './components/Admin/AdminPage';
import { AuthContext } from './context/AuthContext';
import Footer from './components/Footer/Footer';
import orderService from './services/orderService';
import './App.css';

const APP_BASE = '/store';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [notification, setNotification] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderError, setOrderError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                ),
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        setNotification({ message: 'Producto agregado al carrito', type: 'success' });
    };

    const handleRemoveFromCart = (productToRemove) => {
        setCartItems(cartItems.filter((item) => item.id !== productToRemove.id));
    };

    const handleUpdateQuantity = (product, quantity) => {
        if (quantity <= 0) {
            handleRemoveFromCart(product);
        } else {
            setCartItems(
                cartItems.map((item) => (item.id === product.id ? { ...item, quantity } : item)),
            );
        }
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const handleCreateOrder = async () => {
        if (!user) {
            throw new Error('Debes iniciar sesión para finalizar la compra.');
        }

        const userId = user.id ?? user.user_id;

        if (!userId) {
            throw new Error('No se encontró la información del usuario.');
        }

        if (!cartItems.length) {
            throw new Error('No hay productos en el carrito.');
        }

        const payload = {
            user_id: userId,
            items: cartItems.map((item) => ({
                product_id: item.id,
                quantity: item.quantity || 0,
                unit_price: Number(item.price) || 0,
                unit_discount: Number(item.unit_discount ?? item.discount ?? 0),
            })),
        };

        try {
            setOrderError(null);
            const response = await orderService.createOrder(payload);
            const data = response?.data || response;
            setOrderDetails(data);
            return data;
        } catch (error) {
            console.error('Error creating order', error);
            const message =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                'No se pudo crear la orden. Intenta nuevamente.';
            setOrderError(message);
            throw new Error(message);
        }
    };

    return (
        <Router basename={APP_BASE}>
            <Analytics />
            <div className="app-container">
                <div className="content-wrap">
                    <Main
                        cartItems={cartItems}
                        notification={notification}
                        handleCloseNotification={handleCloseNotification}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Landing imageUrl="https://comunidadescolar.com.bo/wp-content/uploads/2019/02/Tejidos.jpg" />
                            }
                        />
                        <Route path="/catalog" element={<Catalog onAddToCart={handleAddToCart} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <ShoppingCart
                                    cartItems={cartItems}
                                    onRemoveFromCart={handleRemoveFromCart}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onCheckout={handleCreateOrder}
                                />
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <PrivateRoute>
                                    <Checkout
                                        cartItems={cartItems}
                                        orderDetails={orderDetails}
                                        orderError={orderError}
                                    />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
