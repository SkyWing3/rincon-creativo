import api, { ensureCsrfToken } from './apiClient';

const getUsers = () => api.get('/users');

const getOrders = () => api.get('/orders');

const getProducts = () => api.get('/products');

const getCategories = () => api.get('/categories');

const createProduct = async (payload) => {
    await ensureCsrfToken();
    return api.post('/products', payload);
};

const updateProduct = async (productId, payload) => {
    await ensureCsrfToken();
    return api.put(`/products/${productId}`, payload);
};

const deleteProduct = async (productId) => {
    await ensureCsrfToken();
    return api.delete(`/products/${productId}`);
};

const createCategory = async (payload) => {
    await ensureCsrfToken();
    return api.post('/categories', payload);
};

const updateCategory = async (categoryId, payload) => {
    await ensureCsrfToken();
    return api.put(`/categories/${categoryId}`, payload);
};

const deleteCategory = async (categoryId) => {
    await ensureCsrfToken();
    return api.delete(`/categories/${categoryId}`);
};

const updateUserRole = async (userId, role) => {
    await ensureCsrfToken();
    return api.patch(`/users/${userId}/role`, { role });
};

const adminService = {
    getUsers,
    getOrders,
    getProducts,
    getCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
    updateUserRole,
};

export default adminService;
