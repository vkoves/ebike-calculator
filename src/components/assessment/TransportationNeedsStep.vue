<template>
  <div class="step-container">
    <h2>What Types Of Transportation Needs Do You Have?</h2>
    <p class="subtitle">Select all that apply to your situation</p>
    
    <div class="options-grid">
      <button 
        type="button"
        class="option-card" 
        :class="{ selected: modelValue.soloCommuting }"
        @click="toggleNeed('soloCommuting')"
        :aria-pressed="modelValue.soloCommuting.toString()"
      >
        <div class="option-icon">🚴</div>
        <div class="option-label">Solo Commuting</div>
      </button>
      
      <button
        type="button" 
        class="option-card" 
        :class="{ selected: modelValue.cargo }"
        @click="toggleNeed('cargo')"
        :aria-pressed="modelValue.cargo.toString()"
      >
        <div class="option-icon">📦</div>
        <div class="option-label">Cargo</div>
      </button>
      
      <button
        type="button" 
        class="option-card" 
        :class="{ selected: modelValue.transportingKids }"
        @click="toggleNeed('transportingKids')"
        :aria-pressed="modelValue.transportingKids.toString()"
      >
        <div class="option-icon">👶</div>
        <div class="option-label">Transporting Kids</div>
      </button>
      
      <button
        type="button" 
        class="option-card" 
        :class="{ selected: modelValue.transportingAdults }"
        @click="toggleNeed('transportingAdults')"
        :aria-pressed="modelValue.transportingAdults.toString()"
      >
        <div class="option-icon">👨‍👩‍👧</div>
        <div class="option-label">Transporting Adults</div>
      </button>
      
      <button
        type="button" 
        class="option-card" 
        :class="{ selected: modelValue.towing }"
        @click="toggleNeed('towing')"
        :aria-pressed="modelValue.towing.toString()"
      >
        <div class="option-icon">🔄</div>
        <div class="option-label">Towing</div>
      </button>
    </div>
    
    <div class="navigation-buttons">
      <button class="btn-next" @click="$emit('next')" :disabled="!hasSelectedAny">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'next']);

const hasSelectedAny = computed(() => {
  return Object.values(props.modelValue).some(value => value);
});

function toggleNeed(need) {
  // Create a new object to maintain reactivity
  const updatedNeeds = { ...props.modelValue };
  // Toggle the value of the specified need
  updatedNeeds[need] = !updatedNeeds[need];
  // Emit the update event with the new object
  emit('update:modelValue', updatedNeeds);
  
  // For debugging
  console.log('Updated transportationNeeds:', updatedNeeds);
}
</script>

<style scoped>
/* These styles are shared across components - could be moved to a common CSS file */
.step-container {
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.option-card {
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Button reset styles */
  appearance: none;
  font: inherit;
  color: inherit;
  width: 100%;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.option-card:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

.option-card.selected {
  border-color: #2c8a57;
  background-color: rgba(44, 138, 87, 0.05);
}

.option-card.selected::before {
  content: "✓";
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: #2c8a57;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.option-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.option-label {
  font-weight: 600;
  color: #2c3e50;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-prev,
.btn-next {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: none;
}

.btn-prev {
  background-color: #e9ecef;
  color: #495057;
}

.btn-prev:hover {
  background-color: #dee2e6;
}

.btn-next {
  background-color: #2c8a57;
  color: white;
  margin-left: auto;
}

.btn-next:hover {
  background-color: #236b45;
}

.btn-next:disabled {
  background-color: #b8d8c7;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .navigation-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn-prev, .btn-next {
    width: 100%;
  }
}
</style>