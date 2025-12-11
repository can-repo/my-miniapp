<template>
  <div class="page">
    <h3>Input Data Baru</h3>
    <form @submit.prevent="submitData" class="form-container">
      <div class="form-group">
        <label>Nama Produk</label>
        <input v-model="form.product" type="text" required />
      </div>
      <div class="form-group">
        <label>Jumlah</label>
        <input v-model.number="form.amount" type="number" required />
      </div>
      <button type="submit" :disabled="submitting" class="submit-btn">
        {{ submitting ? 'Menyimpan...' : 'Simpan Data' }}
      </button>
      <button type="button" @click="router.back()" class="back-btn">Kembali</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { openPopup, isPopupSupported } from '@telegram-apps/sdk-vue';
import { dataService } from '@/services/dataService';

const router = useRouter();
const submitting = ref(false);
const form = reactive({ product: '', amount: 0, date: new Date().toISOString().split('T')[0] });

const submitData = async () => {
  submitting.value = true;
  const result = await dataService.create(form);
  submitting.value = false;

  if (result.success && isPopupSupported()) {
    openPopup({
      title: 'Sukses',
      message: result.message,
      buttons: [{ id: 'ok', type: 'ok' }]
    });
    router.push('/grid');
  }
};
</script>

<style scoped>
.form-container { display: flex; flex-direction: column; gap: 15px; }
.form-group input { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
.submit-btn { padding: 10px; background: var(--tg-theme-button-color, #2481cc); color: white; border: none; border-radius: 5px; cursor: pointer; }
.back-btn { padding: 10px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; }
</style>
