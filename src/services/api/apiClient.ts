import axios from 'axios';
//require('dotenv').config()

//baseURL: 'http://167.172.190.167:3000/api'
export const apiClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  headers: {
    "Content-Type": "application/json",
  },

});

apiClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
