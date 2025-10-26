import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const register = (payload) => api.post('/register', payload);

const login = (email, password) =>
    api.post('/login', {
        email,
        password,
    });

const logout = () => api.post('/logout');

const getProfile = () => api.get('/profile');

const authService = { register, login, logout, getProfile };

export default authService;
