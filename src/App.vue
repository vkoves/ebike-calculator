<template>
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <p>
        © 2025 - <a href="https://viktorkoves.com">Viktor Köves</a>
        | <a href="https://github.com/vkoves/the-right-bike" target="_blank" rel="noopener noreferrer">View On GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style lang="scss">
/* Global styles are imported in main.js */
</style>