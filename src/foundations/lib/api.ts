import axios from 'axios';

export const axiosInstance = axios.create({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.API_KEY,
  },
});