<template>
  <div class="page">
    <h3>Guest In House</h3>
    <div v-if="loading">Memuat data...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Room</th>
          <th>Room Type</th>
          <th>Arrv. Date</th>
          <th>Depart. Date</th>
          <th>Guest Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in guests" :key="guest.room">
          <td>{{ guest.room }}</td>
          <td>{{ guest.roomtype }}</td>
          <td>{{ guest.dateci }}</td>
          <td>{{ guest.dateco }}</td>
          <td>{{ guest.fullname }}</td>
        </tr>
      </tbody>
    </table>
     <button type="button" @click="router.back()" class="back-btn">Back</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { dataService } from '@/services/dataService'
import type { tGsInhouse } from '@/types/gsInHouse';;

const router = useRouter();
const guests = ref<tGsInhouse[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    console.log('Memulai pengambilan data...');
    const data = await dataService.getAll();
    console.log('Data yang diterima:', data);
    console.log('Jumlah data:', data.length);
    guests.value = data;
  } catch (error) {
    console.error('Error saat mengambil data di komponen:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.data-table th, .data-table td { border: 1px solid #ccc; padding: 8px; text-align: left; }
</style>
