<template>
  <div class="page">
    <h3>Analisis Data</h3>
    <div v-if="loading">Memuat grafik...</div>
    <div v-else class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <button @click="router.back()" class="back-btn">Kembali</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { dataService, type SalesData } from '@/services/dataService';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const router = useRouter();
const rawData = ref<SalesData[]>([]);
const loading = ref(true);

onMounted(async () => {
  rawData.value = await dataService.getAll();
  loading.value = false;
});

const chartData = computed(() => ({
  labels: rawData.value.map(d => d.product),
  datasets: [{
    label: 'Penjualan',
    data: rawData.value.map(d => d.amount),
    backgroundColor: '#2481cc'
  }]
}));

const chartOptions = { responsive: true };
</script>

<style scoped>
.chart-container { position: relative; height: 300px; }
.back-btn { padding: 10px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; }
</style>
