<template>
  <div class="results-footer">
    <button class="btn-restart" @click="$emit('restart')">Start Over</button>
    <button class="btn-details">Find Local Bike Shops</button>
  </div>
</template>

<script setup>
defineEmits(['restart']);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/scss/variables' as vars;
@use "../../assets/scss/assessment";
</style>