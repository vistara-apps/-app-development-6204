import axios from 'axios';
import { config } from '../config/environment.js';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add debug logging in development
    if (config.debugMode) {
      console.log('API Request:', config);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    if (config.debugMode) {
      console.log('API Response:', response);
    }
    return response;
  },
  (error) => {
    if (config.debugMode) {
      console.error('API Error:', error);
    }

    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth token and redirect to login
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          throw new Error('Access denied. You do not have permission to perform this action.');
        case 404:
          // Not found
          throw new Error('The requested resource was not found.');
        case 429:
          // Rate limited
          throw new Error('Too many requests. Please try again later.');
        case 500:
          // Server error
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data?.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your internet connection.');
    } else {
      // Other error
      throw new Error('An unexpected error occurred.');
    }
  }
);

// API methods
export const apiService = {
  // Generic CRUD operations
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),

  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    refresh: () => api.post('/auth/refresh'),
    verify: (token) => api.post('/auth/verify', { token }),
  },

  // User management
  user: {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    updatePreferences: (data) => api.patch('/user/preferences', data),
    updateNotificationSettings: (data) => api.patch('/user/notifications', data),
  },

  // Gigs
  gigs: {
    getAll: (params = {}) => api.get('/gigs', { params }),
    getById: (id) => api.get(`/gigs/${id}`),
    getMatching: (userId, params = {}) => api.get(`/gigs/matching/${userId}`, { params }),
    search: (query, params = {}) => api.get('/gigs/search', { params: { q: query, ...params } }),
  },

  // Applications
  applications: {
    getAll: (userId) => api.get(`/applications/user/${userId}`),
    getById: (id) => api.get(`/applications/${id}`),
    create: (data) => api.post('/applications', data),
    update: (id, data) => api.put(`/applications/${id}`, data),
    delete: (id) => api.delete(`/applications/${id}`),
  },

  // External job board integrations
  external: {
    upwork: {
      getJobs: (params = {}) => api.get('/external/upwork/jobs', { params }),
      getJobDetails: (jobId) => api.get(`/external/upwork/jobs/${jobId}`),
    },
    fiverr: {
      getJobs: (params = {}) => api.get('/external/fiverr/jobs', { params }),
      getJobDetails: (jobId) => api.get(`/external/fiverr/jobs/${jobId}`),
    },
    freelancer: {
      getJobs: (params = {}) => api.get('/external/freelancer/jobs', { params }),
      getJobDetails: (jobId) => api.get(`/external/freelancer/jobs/${jobId}`),
    },
  },

  // Notifications
  notifications: {
    getAll: (userId) => api.get(`/notifications/user/${userId}`),
    markAsRead: (id) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: (userId) => api.patch(`/notifications/user/${userId}/read-all`),
  },

  // Payments
  payments: {
    createPaymentIntent: (data) => api.post('/payments/intent', data),
    confirmPayment: (paymentIntentId) => api.post(`/payments/confirm/${paymentIntentId}`),
    getPaymentHistory: (userId) => api.get(`/payments/history/${userId}`),
  },
};

export default api;
