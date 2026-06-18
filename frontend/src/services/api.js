import axios from 'axios';
import { local } from './storage';

// In production, fallback to relative path so it hits the same origin 
// OR use VITE_API_URL only if it's not localhost (in case it was baked in from .env)
let API_URL = import.meta.env.PROD ? '/api/v1' : 'http://127.0.0.1:5000/api/v1';

if (import.meta.env.VITE_API_URL) {
  if (import.meta.env.PROD && (import.meta.env.VITE_API_URL.includes('localhost') || import.meta.env.VITE_API_URL.includes('127.0.0.1'))) {
    // Ignore localhost in production (baked in from .env by mistake)
    API_URL = '/api/v1';
  } else {
    // Force 127.0.0.1 to avoid Windows Node.js IPv6 resolution timeout issues
    API_URL = import.meta.env.VITE_API_URL.replace('localhost', '127.0.0.1');
  }
}

// Create a global Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = local.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle global errors like expired tokens and basic retries
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Basic Retry Mechanism for 5xx errors or Network Timeout (Max 2 retries)
    if (config) {
      config.retryCount = config.retryCount || 0;

      const isRetryableError =
        !error.response || (error.response.status >= 500 && error.response.status < 600);

      if (isRetryableError && config.retryCount < 2) {
        config.retryCount += 1;
        // Exponential backoff: 1s, then 2s
        const delay = new Promise((resolve) => setTimeout(resolve, config.retryCount * 1000));
        await delay;
        return api(config);
      }
    }

    // If the server returns 401 Unauthorized, the token is invalid or expired
    // Skip redirect for auth routes to avoid infinite redirect loops on login/register
    const isAuthRoute = config?.url && (
      config.url.includes('/auth/login') ||
      config.url.includes('/auth/register') ||
      config.url.includes('/auth/forgot-password') ||
      config.url.includes('/auth/reset-password') ||
      config.url.includes('/auth/refresh-token')
    );
    if (error.response && error.response.status === 401 && !isAuthRoute) {
      local.clearAll();
      // Redirect to login page to force re-authentication (only if not already there)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
