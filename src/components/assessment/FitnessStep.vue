<template>
  <div class="step-container">
    <h2>What's your fitness level?</h2>
    <p class="subtitle">Be honest - this helps us make the right recommendation</p>
    
    <div class="options-grid">
      <button 
        type="button"
        class="option-card fitness-card" 
        :class="{ selected: modelValue === 'low' }"
        @click="updateFitnessLevel('low')"
        :aria-pressed="(modelValue === 'low').toString()"
      >
        <div class="option-icon">😅</div>
        <div class="option-label">Low</div>
        <p class="option-description">I'm nervous about biking at all</p>
      </button>
      
      <button 
        type="button"
        class="option-card fitness-card" 
        :class="{ selected: modelValue === 'medium' }"
        @click="updateFitnessLevel('medium')"
        :aria-pressed="(modelValue === 'medium').toString()"
      >
        <div class="option-icon">🤷</div>
        <div class="option-label">Medium</div>
        <p class="option-description">I'd be fine biking a bit, but maybe not too far!</p>
      </button>
      
      <button 
        type="button"
        class="option-card fitness-card" 
        :class="{ selected: modelValue === 'high' }"
        @click="updateFitnessLevel('high')"
        :aria-pressed="(modelValue === 'high').toString()"
      >
        <div class="option-icon">💪</div>
        <div class="option-label">High</div>
        <p class="option-description">I could bike for a long distance, no problem!</p>
      </button>
    </div>
    
    <div class="navigation-buttons">
      <button class="btn-prev" @click="$emit('prev')">Back</button>
      <button class="btn-next" @click="$emit('calculate')">See My Results</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'prev', 'calculate']);

function updateFitnessLevel(level) {
  // Emit the update event with the new level
  emit('update:modelValue', level);
  
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/scss/variables' as vars;
@use "../../assets/scss/assessment";

.fitness-card {
  padding: 2rem 1.5rem;
}
</style>