import axios from 'axios';
const configuredUrl = axios.create({ baseURL: import.meta.env.VITE_APP_URL });
export default configuredUrl;
