<template>
  <div class="results-footer">
    <button class="btn-restart" @click="$emit('restart')">Start Over</button>
    <a class="btn-details" href="https://www.google.com/search?q=bike%20shops%20near%20me"
      target="_blank">
      Find Local Bike Shops
    </a>
  </div>
</template>

<script setup>
defineEmits(['restart']);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/scss/variables' as vars;
@use "../../assets/scss/assessment";

.results-footer a {
  margin-left: 1rem;
  text-decoration: none;
}
</style>