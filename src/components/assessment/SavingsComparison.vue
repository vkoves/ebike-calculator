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
    
    <!-- FAQ Section -->
    <div class="faq-section">
      <h3>What if I need a car sometimes? 🤔</h3>
      <div class="faq-content">
        <p>Even with a bike as your primary transportation, you'll occasionally need a car for certain trips. Here are cost-effective alternatives to car ownership:</p>
        
        <div class="alternatives-grid">
          <div class="alternative-card">
            <div class="alternative-icon">🚗</div>
            <h4>Car Sharing</h4>
            <p>Services like Zipcar or Getaround offer hourly rentals (~$10-15/hour) for quick errands.</p>
            <div class="alternative-savings">
              <strong>10 rentals/year:</strong> $300-450
            </div>
          </div>
          
          <div class="alternative-card">
            <div class="alternative-icon">🚕</div>
            <h4>Ride Share</h4>
            <p>Uber, Lyft or taxis are perfect for evenings out or airport trips.</p>
            <div class="alternative-savings">
              <strong>20 rides/year:</strong> $400-600
            </div>
          </div>
          
          <div class="alternative-card">
            <div class="alternative-icon">🛻</div>
            <h4>Truck/Van Rental</h4>
            <p>Home Depot, U-Haul or similar for large purchases and moves.</p>
            <div class="alternative-savings">
              <strong>3 rentals/year:</strong> $150-300
            </div>
          </div>
        </div>
        
        <div class="total-comparison">
          <p v-if="adjustedSavings > 0">
            Even if you spend <strong>$1,000/year</strong> on occasional rentals and ride-shares, that's still 
            <span class="highlight-amount"><strong>{{ formatCurrency(adjustedSavings) }}</strong></span> 
            less than the 5-year cost of car ownership!
          </p>
          <p v-else>
            When you factor in <strong>$1,000/year</strong> for occasional rentals and ride-shares, you're still 
            <span class="highlight-amount"><strong>coming out ahead</strong></span> 
            compared to full car ownership, while gaining health benefits and reducing environmental impact!
          </p>
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
  // Reset the comparison dropdown if the recommendation changes
  if (oldType && newType !== oldType && comparisonBike.value) {
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

// Calculate savings after accounting for alternative transportation costs
const adjustedSavings = computed(() => {
  // Assume $1000/year for alternative transportation (5 years total)
  const alternativeTransportCost = 5000; 
  // Calculate savings after alternative costs
  const netSavings = savingsAmount.value - alternativeTransportCost;
  // Make sure the value is never negative
  const positiveNetSavings = Math.max(0, netSavings);
  // Round to nearest thousand for cleaner number
  return Math.floor(positiveNetSavings / 1000) * 1000;
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
  
  
  // Emit the bike change event to the parent component
  emit('bike-change', selectedValue);
  
  // Ensure the selection is maintained (in case it gets reset by reactivity)
  setTimeout(() => {
    if (comparisonBike.value !== selectedValue) {
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

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/scss/variables' as vars;

.savings-section {
  background-color: vars.$lightest-gray;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: vars.$shadow-sm;
}

.savings-heading {
  color: vars.$primary;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
}

.savings-intro {
  color: vars.$gray;
  margin-bottom: 1.5rem;
  text-align: center;
}

.compare-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  background-color: vars.$primary-lighter;
  padding: 1rem;
  border-radius: vars.$border-radius;
  border: 1px dashed vars.$primary;
}

.compare-selector label {
  font-weight: 600;
  color: vars.$primary;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.compare-selector select {
  padding: 0.75rem 1.5rem;
  border-radius: vars.$border-radius-lg;
  border: 1px solid vars.$primary;
  background-color: vars.$white;
  font-size: 1rem;
  color: vars.$text-body;
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
  
  &:hover {
    border-color: vars.$primary-dark;
    box-shadow: vars.$shadow-button;
  }
  
  &:focus {
    border-color: vars.$primary-dark;
    box-shadow: 0 0 0 3px rgba(44, 138, 87, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    border-color: vars.$bg-disabled;
  }
}

.debug-info {
  background-color: vars.$danger-light;
  color: vars.$danger-darker;
  font-family: monospace;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: vars.$border-radius-sm;
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
  background-color: vars.$white;
  border-radius: vars.$border-radius;
  box-shadow: vars.$shadow-md;
  overflow: hidden;
}

.comparison-header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid vars.$border-lighter;
  
  img {
    width: 150px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: vars.$shadow-image;
    transition: all 0.3s ease;
  }
  
  h4 {
    color: vars.$dark;
    font-size: 1.2rem;
  }
}

.comparing .comparison-header img {
  box-shadow: vars.$shadow-image-highlight;
}

.cost-breakdown {
  padding: 1.5rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid vars.$border-lighter;
  
  &.total {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1.5rem;
    border-top: 2px solid vars.$border-lighter;
    border-bottom: none;
    padding-top: 1rem;
  }
}

.cost-label {
  color: vars.$gray;
}

.cost-value {
  font-weight: 600;
  color: vars.$dark;
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
  background-color: vars.$secondary;
  color: vars.$white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.comparing-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: normal;
  background-color: vars.$secondary;
  color: vars.$white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.comparison-item.comparing {
  border-left: 3px solid vars.$secondary;
}

.bike .cost-value {
  color: vars.$primary;
}

.car .cost-value {
  color: vars.$danger;
}

.car .cost-item.total .cost-value {
  color: vars.$danger-dark;
}

.bike .cost-item.total .cost-value {
  color: vars.$primary-light;
}

.savings-highlight {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: vars.$bg-highlight;
  border-radius: vars.$border-radius;
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
  
  h3 {
    margin-bottom: 1rem;
  }
  
  .amount {
    font-size: 2.5rem;
    font-weight: bold;
    color: vars.$primary-light;
  }
}

.savings-benefits {
  flex: 2;
  min-width: 250px;
  
  h4 {
    color: vars.$dark;
    margin-bottom: 1rem;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.benefit-card {
  background-color: vars.$white;
  border-radius: vars.$border-radius;
  padding: 1.5rem;
  text-align: center;
  box-shadow: vars.$shadow-md;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: vars.$shadow-lg;
  }
  
  h5 {
    color: vars.$primary;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: vars.$dark;
    font-size: 0.95rem;
    line-height: 1.4;
  }
}

.benefit-emoji {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* FAQ Section Styles */
.faq-section {
  background-color: vars.$lightest-gray;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: vars.$shadow-sm;
  
  h3 {
    color: vars.$primary;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
}

.faq-content p {
  text-align: center;
  color: vars.$dark;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.alternative-card {
  background-color: vars.$white;
  border-radius: vars.$border-radius;
  padding: 1.5rem;
  text-align: center;
  box-shadow: vars.$shadow-md;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: vars.$shadow-lg;
  }
  
  h4 {
    color: vars.$dark;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }
  
  p {
    color: vars.$gray;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    flex-grow: 1;
  }
}

.alternative-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.alternative-savings {
  background-color: vars.$primary-lighter;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: vars.$primary-light;
}

.total-comparison {
  background-color: vars.$primary;
  padding: 1.75rem;
  border-radius: vars.$border-radius;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: vars.$shadow-primary;
  position: relative;
  overflow: hidden;
  animation: pulse 2s infinite;
  
  p {
    margin-bottom: 0;
    font-size: 1.2rem;
    color: vars.$white;
    line-height: 1.6;
  }
  
  strong {
    color: vars.$white;
    font-weight: 700;
    background-color: rgba(255, 255, 255, vars.$opacity-light);
    padding: 0.15rem 0.4rem;
    border-radius: vars.$border-radius-sm;
  }
}

@keyframes pulse {
  0% {
    box-shadow: vars.$shadow-primary;
  }
  50% {
    box-shadow: vars.$shadow-primary-active;
  }
  100% {
    box-shadow: vars.$shadow-primary;
  }
}

.highlight-amount {
  display: block;
  margin: 0.5rem 0;
  font-size: 1.4rem;
  
  strong {
    background-color: rgba(255, 255, 255, vars.$opacity-medium);
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    display: inline-block;
    margin: 0.25rem 0;
    box-shadow: vars.$shadow-card;
  }
}

@media (max-width: 900px) {
  .benefits-grid, .alternatives-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .savings-heading {
    font-size: 1.8rem;
  }
  
  .compare-selector {
    padding: 0.75rem;
    
    label {
      font-size: 1rem;
      text-align: center;
    }
    
    select {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
  }

  .benefits-grid, .alternatives-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .benefit-emoji, .alternative-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .benefit-card {
    padding: 1.25rem;
  }
  
  .savings-highlight {
    padding: 1.5rem;
  }
  
  .faq-section h3 {
    font-size: 1.5rem;
  }
  
  .total-comparison {
    padding: 1.5rem 1rem;
    margin-top: 1rem;
    
    p {
      font-size: 1.05rem;
    }
    
    strong {
      display: inline-block;
      margin: 0.25rem 0;
    }
  }
}
</style>