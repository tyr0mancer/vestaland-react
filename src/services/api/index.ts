import axios from 'axios';

export const apiClient = axios.create({
  //baseURL: 'https://api.vestaland.de/api'
  baseURL: 'http://167.172.190.167:3000/api'
});

