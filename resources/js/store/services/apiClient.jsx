import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

let csrfPromise = null;

export const ensureCsrfToken = () => {
    if (csrfPromise) {
        return csrfPromise;
    }
    csrfPromise = axios
        .get('/sanctum/csrf-cookie', { withCredentials: true })
        .finally(() => {
            csrfPromise = null;
        });
    return csrfPromise;
};

export default api;
