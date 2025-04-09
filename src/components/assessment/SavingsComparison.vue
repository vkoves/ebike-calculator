<template>
  <div class="savings-section">
    <h2 class="savings-heading">Potential Savings vs. Car Ownership</h2>
    <p class="savings-intro">See how much you could save by choosing a bike instead of a new car</p>
    
    <div class="compare-selector">
      <label for="compare-bike">Compare with another type of bike:</label>
      <select 
        id="compare-bike" 
        v-model="comparisonBike"
        @change="handleComparisonChange"
        :disabled="availableBikeTypes.length <= 1"
      >
        <option value="">Original Recommendation</option>
        <option 
          v-for="type in availableBikeTypes" 
          :key="type.value" 
          :value="type.value"
        >
          {{ type.label }}
        </option>
      </select>
      <div v-if="debug" class="debug-info">
        Selected value: "{{ comparisonBike }}"
      </div>
    </div>

    <div class="comparison-container">
      <div class="comparison-item bike" :class="{ 'comparing': isComparing }">
        <div class="comparison-header">
          <img :src="bikeImage" :alt="bikeTitle">
          <h4>{{ bikeTitle }} <span v-if="isComparing" class="comparing-badge">Comparing</span></h4>
        </div>
        <div class="cost-breakdown">
          <div class="cost-item">
            <span class="cost-label">Initial Purchase</span>
            <span class="cost-value">{{ formatCurrency(costs.bike.purchase) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual Maintenance</span>
            <span class="cost-value">{{ formatCurrency(costs.bike.maintenance) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual "Fuel" Cost</span>
            <span class="cost-value">{{ formatCurrency(costs.bike.fuel) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual Insurance</span>
            <span class="cost-value">{{ formatCurrency(costs.bike.insurance) }}</span>
          </div>
          <div class="cost-item total">
            <span class="cost-label">5-Year Total Cost</span>
            <span class="cost-value">{{ formatCurrency(bikeTotalCost) }}</span>
          </div>
        </div>
      </div>

      <div class="comparison-divider">
        <div class="vs-circle">VS</div>
      </div>

      <div class="comparison-item car">
        <div class="comparison-header">
          <img src="/images/honda-crv.jpg" alt="New Honda CR-V">
          <h4>New Honda CR-V</h4>
        </div>
        <div class="cost-breakdown">
          <div class="cost-item">
            <span class="cost-label">Initial Purchase</span>
            <span class="cost-value">{{ formatCurrency(costs.car.purchase) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual Maintenance</span>
            <span class="cost-value">{{ formatCurrency(costs.car.maintenance) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual Fuel Cost</span>
            <span class="cost-value">{{ formatCurrency(costs.car.fuel) }}</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">Annual Insurance</span>
            <span class="cost-value">{{ formatCurrency(costs.car.insurance) }}</span>
          </div>
          <div class="cost-item total">
            <span class="cost-label">5-Year Total Cost</span>
            <span class="cost-value">{{ formatCurrency(carTotalCost) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="savings-highlight">
      <div class="savings-number">
        <h3>Your 5-Year Savings:</h3>
        <div class="amount">{{ formatCurrency(savingsAmount) }}</div>
      </div>
      <div class="savings-benefits">
        <h4>What else you could do with this money:</h4>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-emoji">✈️</div>
            <h5>Travel</h5>
            <p>Take {{ Math.round(savingsAmount / 2000) }} international vacations</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-emoji">🏠</div>
            <h5>Housing</h5>
            <p>Save for a down payment on your dream home</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-emoji">📈</div>
            <h5>Invest</h5>
            <p>Worth {{ formatCurrency(savingsAmount * 1.5) }} in 10 years at 7% growth</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  bikeTitle: {
    type: String,
    required: true
  },
  bikeImage: {
    type: String,
    required: true
  },
  costs: {
    type: Object,
    required: true
  },
  selectedBikeType: {
    type: String,
    required: false,
    default: ''
  },
  allBikeTypes: {
    type: Object,
    required: false,
    default: () => ({
      'regular-bike': {
        title: 'Regular Bicycle',
        label: 'Regular Bicycle'
      },
      'commuter-ebike': {
        title: 'Commuter Electric Bicycle',
        label: 'Electric Commuter Bike'
      },
      'cargo-bike': {
        title: 'Cargo Bicycle',
        label: 'Cargo Bike'
      },
      'cargo-ebike': {
        title: 'Electric Cargo Bicycle (Bucket Style)',
        label: 'Electric Cargo Bike'
      },
      'longtail-ebike': {
        title: 'Electric Longtail Cargo Bicycle',
        label: 'Longtail E-Bike'
      }
    })
  }
});

const emit = defineEmits(['bike-change']);

// State for comparison dropdown
const comparisonBike = ref('');
// Debug flag
const debug = ref(false);

// Track if we're comparing bikes
const isComparing = computed(() => comparisonBike.value !== '');

// Watch for changes in the selected bike type from parent
watch(() => props.selectedBikeType, (newType, oldType) => {
  console.log('Selected bike type from parent changed to:', newType);
  
  // Reset the comparison dropdown if the recommendation changes
  if (oldType && newType !== oldType && comparisonBike.value) {
    console.log('Recommendation changed, resetting comparison');
    comparisonBike.value = '';
  }
}, { immediate: true });

// Computed properties for cost calculations
const bikeTotalCost = computed(() => {
  return props.costs.bike.purchase +
         (props.costs.bike.maintenance * 5) +
         (props.costs.bike.fuel * 5) +
         (props.costs.bike.insurance * 5);
});

const carTotalCost = computed(() => {
  return props.costs.car.purchase +
         (props.costs.car.maintenance * 5) +
         (props.costs.car.fuel * 5) +
         (props.costs.car.insurance * 5);
});

const savingsAmount = computed(() => {
  return carTotalCost.value - bikeTotalCost.value;
});

// Get the current recommendation type
const recommendationType = computed(() => {
  // If we have a selected bike type from the parent, use that
  if (props.selectedBikeType) {
    return props.selectedBikeType;
  }
  
  // Otherwise, try to find it by matching the title
  for (const [key, details] of Object.entries(props.allBikeTypes)) {
    if (details.title === props.bikeTitle) {
      return key;
    }
  }
  
  return '';
});

// Generate list of available bike types for comparison
const availableBikeTypes = computed(() => {
  const currentType = recommendationType.value;
  
  return Object.entries(props.allBikeTypes)
    .filter(([key]) => key !== currentType)
    .map(([key, value]) => ({
      value: key,
      label: value.label || value.title
    }));
});

// Handle bike type change from dropdown
function handleComparisonChange() {
  // Store the selected value in case it gets reset
  const selectedValue = comparisonBike.value;
  
  // Log the change for debugging
  if (selectedValue) {
    console.log('Comparing with bike type:', selectedValue);
  } else {
    console.log('Reverted to original recommendation');
  }
  
  // Emit the bike change event to the parent component
  emit('bike-change', selectedValue);
  
  // Ensure the selection is maintained (in case it gets reset by reactivity)
  setTimeout(() => {
    if (comparisonBike.value !== selectedValue) {
      console.log('Selection was reset, restoring to:', selectedValue);
      comparisonBike.value = selectedValue;
    }
  }, 0);
}

// Currency formatting helper
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}
</script>

<style scoped>
.savings-section {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.savings-heading {
  color: #2c8a57;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
}

.savings-intro {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  text-align: center;
}

.compare-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #eafaf1;
  padding: 1rem;
  border-radius: 10px;
  border: 1px dashed #2c8a57;
}

.compare-selector label {
  font-weight: 600;
  color: #2c8a57;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.compare-selector select {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: 1px solid #2c8a57;
  background-color: white;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  text-align: center;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c8a57%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
  transition: all 0.2s ease;
}

.compare-selector select:hover {
  border-color: #236b45;
  box-shadow: 0 2px 8px rgba(44, 138, 87, 0.2);
}

.compare-selector select:focus {
  border-color: #236b45;
  box-shadow: 0 0 0 3px rgba(44, 138, 87, 0.2);
}

.compare-selector select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #cacaca;
}

.debug-info {
  background-color: #ffebee;
  color: #d32f2f;
  font-family: monospace;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.comparison-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 2rem;
}

.comparison-item {
  flex: 1;
  min-width: 250px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}

.comparison-header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #f1f1f1;
}

.comparison-header img {
  width: 150px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.comparing .comparison-header img {
  box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
}

.comparison-header h4 {
  color: #2c3e50;
  font-size: 1.2rem;
}

.cost-breakdown {
  padding: 1.5rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.cost-item.total {
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  border-top: 2px solid #f1f1f1;
  border-bottom: none;
  padding-top: 1rem;
}

.cost-label {
  color: #7f8c8d;
}

.cost-value {
  font-weight: 600;
  color: #2c3e50;
}

.comparison-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.comparing-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: normal;
  background-color: #3498db;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.comparison-item.comparing {
  border-left: 3px solid #3498db;
}

.bike .cost-value {
  color: #2c8a57;
}

.car .cost-value {
  color: #e74c3c;
}

.car .cost-item.total .cost-value {
  color: #c0392b;
}

.bike .cost-item.total .cost-value {
  color: #27ae60;
}

.savings-highlight {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #e8f8ee;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.savings-number {
  flex: 1;
  min-width: 250px;
  text-align: center;
}

.savings-number h3 {
  margin-bottom: 1rem;
}

.savings-number .amount {
  font-size: 2.5rem;
  font-weight: bold;
  color: #27ae60;
}

.savings-benefits {
  flex: 2;
  min-width: 250px;
}

.savings-benefits h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.benefit-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.benefit-emoji {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.benefit-card h5 {
  color: #2c8a57;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.benefit-card p {
  color: #2c3e50;
  font-size: 0.95rem;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .savings-heading {
    font-size: 1.8rem;
  }
  
  .compare-selector {
    padding: 0.75rem;
  }
  
  .compare-selector label {
    font-size: 1rem;
    text-align: center;
  }
  
  .compare-selector select {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .benefit-emoji {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .benefit-card {
    padding: 1.25rem;
  }
  
  .savings-highlight {
    padding: 1.5rem;
  }
}
</style>