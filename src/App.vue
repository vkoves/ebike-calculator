<template>
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <p>© 2025 - EBike Calculator</p>
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

footer {
  text-align: center;
  padding: 1.5rem;
  color: #666;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
}

h1 {
  color: #2c8a57;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  color: #2c8a57;
  margin-bottom: 1rem;
}

button {
  background-color: #2c8a57;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #236b45;
}
</style>