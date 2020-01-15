import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL
});

api.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.params = config.params || {};
  config.params['seed'] = 'sherpany';
  
  return config;
});

export default api;
