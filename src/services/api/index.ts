import axios from 'axios';
export * from './lebensmittelService'

export const apiClient = axios.create({
  baseURL: 'https://api.vestaland.de/api'
});

