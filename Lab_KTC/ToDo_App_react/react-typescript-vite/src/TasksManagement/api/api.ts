// // api/api.ts
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://server.aptech.io',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Tự động đính kèm token nếu có
// API.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
