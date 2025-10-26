import api, { ensureCsrfToken } from './apiClient';

const register = async (payload) => {
    await ensureCsrfToken();
    return api.post('/register', payload);
};

const login = async (email, password) => {
    await ensureCsrfToken();
    return api.post('/login', {
        email,
        password,
    });
};

const logout = async () => {
    await ensureCsrfToken();
    return api.post('/logout');
};

const getProfile = () => api.get('/profile');

const authService = { register, login, logout, getProfile };

export default authService;
