import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status === 401) {
      toast.error('Unauthorized. Please log in.');
    }
    return Promise.reject(error);
  }
);

// Project API
export const projectApi = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  getFeatured: () => api.get('/projects/featured/list'),
  getCategories: () => api.get('/projects/meta/categories'),
};

// Skills API
export const skillApi = {
  getAll: (params = {}) => api.get('/skills', { params }),
  getGrouped: () => api.get('/skills/grouped'),
};

// Contact API
export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
};

// Analytics API
export const analyticsApi = {
  getStats: () => api.get('/analytics/stats/simple'),
  trackVisit: (data) => api.post('/analytics', data),
};

// Articles API
export const articleApi = {
  getAll: (params = {}) => api.get('/articles', { params }),
  getBySlug: (slug) => api.get(`/articles/${slug}`),
  getFeatured: () => api.get('/articles', { params: { featured: 'true', limit: 6 } }),
  getCategories: () => api.get('/articles/meta/categories'),
  getTags: () => api.get('/articles/meta/tags'),
};

// Health check
export const healthCheck = () => api.get('/health');
