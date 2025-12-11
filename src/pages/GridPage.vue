<template>
  <div class="page">
    <h3>Data Penjualan</h3>
    <div v-if="loading">Memuat data...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Produk</th>
          <th>Jumlah</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.product }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
      <button type="button" @click="router.back()" class="back-btn">Kembali</button>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { dataService, type SalesData } from '@/services/dataService';

const router = useRouter();
const items = ref<SalesData[]>([]);
const loading = ref(true);

onMounted(async () => {
  items.value = await dataService.getAll();
  loading.value = false;
});
</script>

<style scoped>
.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.data-table th, .data-table td { border: 1px solid #ccc; padding: 8px; text-align: left; }
</style>
