import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
if (token?.content) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
