<template>
  <div class="results-footer">
    <button class="btn-restart" @click="$emit('restart')">Start Over</button>
    <button class="btn-details">Find Local Bike Shops</button>
  </div>
</template>

<script setup>
defineEmits(['restart']);
</script>

<style scoped>
.results-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-restart,
.btn-details {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: none;
}

.btn-restart {
  background-color: #e9ecef;
  color: #495057;
}

.btn-restart:hover {
  background-color: #dee2e6;
}

.btn-details {
  background-color: #3498db;
  color: white;
}

.btn-details:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .results-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn-restart, .btn-details {
    width: 100%;
  }
}
</style>