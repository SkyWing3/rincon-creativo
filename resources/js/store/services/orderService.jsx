import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const createOrder = (payload) => api.post('/orders', payload);

const orderService = {
    createOrder,
};

export default orderService;
