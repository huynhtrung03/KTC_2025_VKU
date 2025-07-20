import apiClientSimple from './api-client-s';
import apiClientAdvanced from './api-client-ad';

const mode: 'simple' | 'advanced' = 'advanced';

const apiClient = mode === 'advanced' ? apiClientAdvanced : apiClientSimple; // Default export for simplicity

export { apiClient }; // Export both for flexibility