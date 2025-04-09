<template>
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <p>© 2025 - Viktor Köves | <a href="https://github.com/vkoves/ebike-calculator" target="_blank" rel="noopener noreferrer">View On GitHub</a></p>
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style lang="scss">
/* Global styles are imported in main.js */
</style>