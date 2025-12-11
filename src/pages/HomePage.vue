<template>
  <div class="page">
    <h2>Dashboard Mini App</h2>
    <div class="menu">
      <RouterLink to="/grid" class="btn">📂 Lihat Grid Data</RouterLink>
      <RouterLink to="/form" class="btn">📝 Input Data Baru</RouterLink>
      <RouterLink to="/chart" class="btn">📊 Lihat Grafik</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.menu { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
.btn {
  padding: 12px; background: var(--tg-theme-button-color, #2481cc);
  color: var(--tg-theme-button-text-color, #ffffff);
  text-align: center; border-radius: 8px; text-decoration: none; font-weight: bold;
}
</style>
