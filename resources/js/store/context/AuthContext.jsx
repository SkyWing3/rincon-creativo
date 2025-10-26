import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const USER_STORAGE_KEY = 'user';

const getStoredUser = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) {
        return null;
    }
    try {
        return JSON.parse(storedUser);
    } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
    }
};

const persistUser = (user) => {
    if (typeof window === 'undefined') {
        return;
    }
    if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_STORAGE_KEY);
    }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getStoredUser());

    useEffect(() => {
        const hydrateSession = async () => {
            try {
                const response = await authService.getProfile();
                setUser(response.data);
                persistUser(response.data);
            } catch (error) {
                persistUser(null);
                setUser(null);
            }
        };

        hydrateSession();
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        const userData = response?.data?.user || response?.data;
        if (!userData) {
            throw new Error('No se pudo obtener la sesión.');
        }
        setUser(userData);
        persistUser(userData);
        return userData;
    };

    const adminLogin = async (email, password) => {
        const userData = await login(email, password);
        if (!userData || userData.role === 'client') {
            throw new Error('Acceso no autorizado para administradores.');
        }
        return userData;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Error logging out', error);
        }
        setUser(null);
        persistUser(null);
    };

    const register = async (payload) => {
        await authService.register(payload);
        await login(payload.email, payload.password);
    };

    return (
        <AuthContext.Provider value={{ user, login, adminLogin, logout, register, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
