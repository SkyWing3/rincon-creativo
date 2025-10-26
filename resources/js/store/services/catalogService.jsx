import api from './apiClient';

const extractList = (payload) => {
    if (Array.isArray(payload?.data)) {
        return payload.data;
    }
    if (Array.isArray(payload)) {
        return payload;
    }
    return [];
};

const getProducts = async () => {
    const response = await api.get('/products');
    return extractList(response.data);
};

const getCategories = async () => {
    const response = await api.get('/categories');
    return extractList(response.data);
};

const catalogService = {
    getProducts,
    getCategories,
};

export default catalogService;
