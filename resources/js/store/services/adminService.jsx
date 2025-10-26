import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const getUsers = () => api.get('/users');

const getOrders = () => api.get('/orders');

const getProducts = () => api.get('/products');

const getCategories = () => api.get('/categories');

const createProduct = (payload) => api.post('/products', payload);

const updateProduct = (productId, payload) => api.put(`/products/${productId}`, payload);

const deleteProduct = (productId) => api.delete(`/products/${productId}`);

const createCategory = (payload) => api.post('/categories', payload);

const updateCategory = (categoryId, payload) => api.put(`/categories/${categoryId}`, payload);

const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);

const updateUserRole = (userId, role) => api.patch(`/users/${userId}/role`, { role });

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
