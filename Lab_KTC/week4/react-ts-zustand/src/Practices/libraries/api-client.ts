// import apiClientSimple from './api-client-s';
// import apiClientAdvanced from './api-client-ad';

// const mode: 'simple' | 'advanced' = 'advanced';

// const apiClient = mode === 'advanced' ? apiClientAdvanced : apiClientSimple; // Default export for simplicity

// export { apiClient }; // Export both for flexibility

/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';

const URL = 'https://api.escuelajs.co/api/v1';

const apiClient = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;