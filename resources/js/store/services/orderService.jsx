import api, { ensureCsrfToken } from './apiClient';

const createOrder = async (payload) => {
    await ensureCsrfToken();
    return api.post('/orders', payload);
};

const orderService = {
    createOrder,
};

export default orderService;
