// src/services/dataService.ts

// Tipe data (Interface)
export interface SalesData {
  id: number;
  product: string;
  amount: number;
  date: string;
}

// Mock Data
const MOCK_DATA: SalesData[] = [
  { id: 1, product: "Kopi Susu", amount: 150, date: "2023-01-01" },
  { id: 2, product: "Teh Tarik", amount: 100, date: "2023-01-02" },
  { id: 3, product: "Roti Bakar", amount: 200, date: "2023-01-03" },
  { id: 4, product: "Nasi Goreng", amount: 300, date: "2023-01-04" },
  { id: 5, product: "Mie Ayam", amount: 250, date: "2023-01-05" },
];

// Service untuk simulasi API Call
export const dataService = {
  // Simulasi GET data (Browse Data)
  async getAll(): Promise<SalesData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA), 500); // Simulasi latency network
    });
  },

  // Simulasi POST data (Form Submit)
  async create(payload: Omit<SalesData, 'id'>): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      console.log("Mengirim ke API External:", payload);
      setTimeout(() => resolve({ success: true, message: "Data berhasil disimpan!" }), 500);
    });
  }
};
