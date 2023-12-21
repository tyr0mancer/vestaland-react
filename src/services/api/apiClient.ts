import axios from 'axios';

//baseURL: 'http://167.172.190.167:3000/api'
export const apiClient = axios.create({
  baseURL: 'https://api.vestaland.de/api',
  headers: {
    "Content-Type": "application/json",
  },

});

