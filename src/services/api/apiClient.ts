import axios from 'axios';

// @ todo use .env
//require('dotenv').config()

//baseURL: 'http://167.172.190.167:3000/api'
const apiClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});
const refreshClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// @todo review
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log('refresh token')

      refreshClient.post( 'https://api.vestaland.de/api/auth/refresh')
        .then(response => {
          console.log(response.data)
          originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
          return apiClient(originalRequest); // Retry the original request with the new token
        })
        .catch(error => {
          console.log(error.response || error)
          // Handle failed refresh (e.g., redirect to login-page)
        })
    }

    return Promise.reject(error);
  }
);

export {apiClient}
