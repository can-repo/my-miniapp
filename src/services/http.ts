// src/services/http.ts
import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk-vue';

// 1. Buat instance axios
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Fallback ke proxy jika env kosong
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Sisipkan InitData untuk keamanan Backend dan tambahkan token
http.interceptors.request.use(
  (config) => {
    try {
      // Mengambil raw init data string (query string) untuk dikirim ke backend
      // Backend akan menggunakan ini untuk memvalidasi user
      const { initDataRaw } = retrieveLaunchParams();

      if (initDataRaw) {
        // Mengirim data via header Authorization (atau custom header X-Telegram-Auth)
        config.headers.Authorization = `tma ${initDataRaw}`;
      }

      // Tambahkan token ke query parameter
      const token = import.meta.env.VITE_API_TOKEN || 'ASKTHLPUWXNXSELGEABMBSOIX2X6GPOVWOOY92VSJ85GLXUY'; // fallback token
      if (token) {
        config.params = {
          ...config.params,
          token: token
        };
      }
    } catch (e) {
      console.warn('Gagal mengambil launch params (mungkin di luar Telegram)', e);

      // Jika di luar telegram, tetap tambahkan token
      const token = import.meta.env.VITE_API_TOKEN || 'ASKTHLPUWXNXSELGEABMBSOIX2X6GPOVWOOY92VSJ85GLXUY'; // fallback token
      if (token) {
        config.params = {
          ...config.params,
          token: token
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Global Error Handling (Opsional)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default http;
