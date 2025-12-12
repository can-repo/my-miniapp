// src/services/dataService.ts
import http from './http';
import type { tGsInhouse } from '@/types/gsInHouse';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const dataService = {
  // GET Data dari API
  async getAll(): Promise<tGsInhouse[]> {
    try {
      // Endpoint untuk GET: http://192.168.1.10:1968/api/1.0/json/gs-inhouse?token=...
      console.log('Mengakses endpoint:', `${import.meta.env.VITE_API_BASE_URL}/gs-inhouse`);
      const response = await http.get<any>('/gs-inhouse'); // Gunakan 'any' sementara untuk melihat struktur sebenarnya
      console.log('Response dari API:', response);
      console.log('Data API mentah:', response.data);

      // Cek apakah respons adalah HTML (berarti bukan API yang benar)
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('API mengembalikan halaman HTML bukan JSON:', response.data.substring(0, 200) + '...');
        throw new Error('Server API tidak merespons dengan JSON. Mungkin URL API salah atau server offline.');
      }

      // Cek beberapa kemungkinan struktur respons
      let dataToReturn: tGsInhouse[] = [];

      // Cek apakah respons adalah array langsung
      if (Array.isArray(response.data)) {
        dataToReturn = response.data;
        console.log('Respons adalah array langsung');
      }
      // Cek apakah respons mengikuti format ApiResponse
      else if (response.data && typeof response.data === 'object' && response.data.data !== undefined) {
        dataToReturn = response.data.data || [];
        console.log('Respons mengikuti format ApiResponse standar');
      }
      // Cek struktur umum lainnya seperti results
      else if (response.data && response.data.results) {
        dataToReturn = response.data.results;
        console.log('Respons menggunakan struktur "results"');
      }
      // Cek struktur dengan nama field lain
      else if (response.data && response.data.gs_inhouse) {
        dataToReturn = response.data.gs_inhouse;
        console.log('Respons menggunakan struktur "gs_inhouse"');
      }
      else {
        console.warn('Struktur respons API tidak dikenal:', response.data);
        dataToReturn = [];
      }

      console.log('Data yang akan dikembalikan:', dataToReturn);
      return dataToReturn;
    } catch (error: any) {
      console.error("Gagal mengambil data:", error);
      console.error("Error detail:", error.response || error.message || error);
      return []; // Return array kosong jika error agar UI tidak crash
    }
  },

   //POST Data ke API
   async create(payload: Omit<tGsInhouse, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
      // Endpoint untuk POST: http://192.168.1.10:1968/api/1.0/json/gs-inhouse?token=...
      console.log('Mengirim data ke endpoint:', `${import.meta.env.VITE_API_BASE_URL}/gs-inhouse`);
      console.log('Payload:', payload);
      const response = await http.post<ApiResponse<tGsInhouse>>('/gs-inhouse', payload);
      console.log('Response POST:', response);

      return {
        success: true,
        message: response.data.message || 'Data berhasil disimpan ke server!'
      };
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      console.error("Error POST detail:", error.response || error.message || error);
      return {
        success: false,
        message: error.response?.data?.message || 'Gagal menghubungi server.'
      };
    }
  }
};
