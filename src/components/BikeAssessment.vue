<template>
  <div class="page-container">
    <h1>Find Your Perfect Bike</h1>
    <p class="page-intro">Answer a few questions about your needs, and we'll recommend the right bike type for you.</p>

    <div class="assessment-container">
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <transition name="fade" mode="out-in">
      <!-- Step 1: Transportation Needs -->
      <div v-if="currentStep === 1" key="step1" class="step-container">
        <h2>What Types Of Transportation Needs Do You Have?</h2>
        <p class="subtitle">Select all that apply to your situation</p>

        <div class="options-grid">
          <button
            type="button"
            class="option-card"
            :class="{ selected: transportationNeeds.soloCommuting }"
            @click="toggleNeed('soloCommuting')"
            :aria-pressed="transportationNeeds.soloCommuting.toString()"
          >
            <div class="option-icon">🚴</div>
            <div class="option-label">Solo Commuting</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: transportationNeeds.cargo }"
            @click="toggleNeed('cargo')"
            :aria-pressed="transportationNeeds.cargo.toString()"
          >
            <div class="option-icon">📦</div>
            <div class="option-label">Cargo</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: transportationNeeds.transportingKids }"
            @click="toggleNeed('transportingKids')"
            :aria-pressed="transportationNeeds.transportingKids.toString()"
          >
            <div class="option-icon">👶</div>
            <div class="option-label">Transporting Kids</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: transportationNeeds.transportingAdults }"
            @click="toggleNeed('transportingAdults')"
            :aria-pressed="transportationNeeds.transportingAdults.toString()"
          >
            <div class="option-icon">👨‍👩‍👧</div>
            <div class="option-label">Transporting Adults</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: transportationNeeds.towing }"
            @click="toggleNeed('towing')"
            :aria-pressed="transportationNeeds.towing.toString()"
          >
            <div class="option-icon">🔄</div>
            <div class="option-label">Towing</div>
          </button>
        </div>

        <div class="navigation-buttons">
          <button class="btn-next" @click="nextStep" :disabled="!hasSelectedAny">Continue</button>
        </div>
      </div>

      <!-- Step 2: Geography -->
      <div v-else-if="currentStep === 2" key="step2" class="step-container">
        <h2>Is it Windy Or Hilly Where You Are?</h2>
        <p class="subtitle">Select all that apply to your location</p>

        <div class="options-grid">
          <button
            type="button"
            class="option-card"
            :class="{ selected: geography.windy }"
            @click="toggleGeography('windy')"
            :aria-pressed="geography.windy.toString()"
          >
            <div class="option-icon">🌬️</div>
            <div class="option-label">Windy</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: geography.hilly }"
            @click="toggleGeography('hilly')"
            :aria-pressed="geography.hilly.toString()"
          >
            <div class="option-icon">⛰️</div>
            <div class="option-label">Hilly</div>
          </button>

          <button
            type="button"
            class="option-card"
            :class="{ selected: !geography.windy && !geography.hilly }"
            @click="setFlatGeography"
            :aria-pressed="(!geography.windy && !geography.hilly).toString()"
          >
            <div class="option-icon">📏</div>
            <div class="option-label">Mostly Flat</div>
          </button>
        </div>

        <div class="navigation-buttons">
          <button class="btn-prev" @click="prevStep">Back</button>
          <button class="btn-next" @click="nextStep">Continue</button>
        </div>
      </div>

      <!-- Step 3: Fitness Level -->
      <div v-else-if="currentStep === 3" key="step3" class="step-container">
        <h2>What's your fitness level?</h2>
        <p class="subtitle">Be honest - this helps us make the right recommendation</p>

        <div class="options-grid">
          <button
            type="button"
            class="option-card fitness-card"
            :class="{ selected: fitnessLevel === 'low' }"
            @click="fitnessLevel = 'low'"
            :aria-pressed="(fitnessLevel === 'low').toString()"
          >
            <div class="option-icon">😅</div>
            <div class="option-label">Low</div>
            <p class="option-description">I'm nervous about biking at all</p>
          </button>

          <button
            type="button"
            class="option-card fitness-card"
            :class="{ selected: fitnessLevel === 'medium' }"
            @click="fitnessLevel = 'medium'"
            :aria-pressed="(fitnessLevel === 'medium').toString()"
          >
            <div class="option-icon">🤷</div>
            <div class="option-label">Medium</div>
            <p class="option-description">I'd be fine biking a bit, but maybe not too far!</p>
          </button>

          <button
            type="button"
            class="option-card fitness-card"
            :class="{ selected: fitnessLevel === 'high' }"
            @click="fitnessLevel = 'high'"
            :aria-pressed="(fitnessLevel === 'high').toString()"
          >
            <div class="option-icon">💪</div>
            <div class="option-label">High</div>
            <p class="option-description">I could bike for a long distance, no problem!</p>
          </button>
        </div>

        <div class="navigation-buttons">
          <button class="btn-prev" @click="prevStep">Back</button>
          <button class="btn-next" @click="calculateRecommendation">See My Results</button>
        </div>
      </div>

      <!-- Step 4: Results -->
      <div v-else-if="currentStep === 4" key="step4" class="step-container results-container">
        <h2>Your Recommended Bike Type</h2>

        <div class="result-card">
          <div class="result-image">
            <img :src="recommendationDetails.image" :alt="recommendationDetails.title">
          </div>
          <div class="result-content">
            <h3>{{ recommendationDetails.title }}</h3>
            <p class="result-description">{{ recommendationDetails.description }}</p>

            <div class="feature-list">
              <div class="feature" v-for="(feature, index) in recommendationDetails.features" :key="index">
                <span class="feature-icon">✓</span>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="price-range">
              <span>Typical Price Range:</span>
              <strong>{{ recommendationDetails.priceRange }}</strong>
            </div>
          </div>
        </div>

        <!-- Savings Comparison Section -->
        <div class="savings-section">
          <h3>Potential Savings vs. Car Ownership</h3>
          <p class="savings-intro">See how much you could save by choosing a bike instead of a new car</p>

          <div class="comparison-container">
            <div class="comparison-item bike">
              <div class="comparison-header">
                <img :src="recommendationDetails.image" :alt="recommendationDetails.title">
                <h4>{{ recommendationDetails.title }}</h4>
              </div>
              <div class="cost-breakdown">
                <div class="cost-item">
                  <span class="cost-label">Initial Purchase</span>
                  <span class="cost-value">{{ getCostFormatted(purchaseCosts.bike) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual Maintenance</span>
                  <span class="cost-value">{{ getCostFormatted(maintenanceCosts.bike) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual "Fuel" Cost</span>
                  <span class="cost-value">{{ getCostFormatted(fuelCosts.bike) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual Insurance</span>
                  <span class="cost-value">{{ getCostFormatted(insuranceCosts.bike) }}</span>
                </div>
                <div class="cost-item total">
                  <span class="cost-label">5-Year Total Cost</span>
                  <span class="cost-value">{{ getCostFormatted(getTotalCost('bike')) }}</span>
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
                  <span class="cost-value">{{ getCostFormatted(purchaseCosts.car) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual Maintenance</span>
                  <span class="cost-value">{{ getCostFormatted(maintenanceCosts.car) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual Fuel Cost</span>
                  <span class="cost-value">{{ getCostFormatted(fuelCosts.car) }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Annual Insurance</span>
                  <span class="cost-value">{{ getCostFormatted(insuranceCosts.car) }}</span>
                </div>
                <div class="cost-item total">
                  <span class="cost-label">5-Year Total Cost</span>
                  <span class="cost-value">{{ getCostFormatted(getTotalCost('car')) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="savings-highlight">
            <div class="savings-number">
              <h3>Your 5-Year Savings:</h3>
              <div class="amount">{{ getCostFormatted(getSavingsAmount()) }}</div>
            </div>
            <div class="savings-benefits">
              <h4>What else you could do with this money:</h4>
              <ul>
                <li>Take {{ Math.round(getSavingsAmount() / 2000) }} international vacations</li>
                <li>Save for a down payment on a home</li>
                <li>Invest for retirement (worth {{ getCostFormatted(getSavingsAmount() * 1.5) }} in 10 years at 7% growth)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="navigation-buttons">
          <button class="btn-restart" @click="restartAssessment">Start Over</button>
          <button class="btn-details">Find Local Bike Shops</button>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

// State
const currentStep = ref(1);
const transportationNeeds = reactive({
  soloCommuting: false,
  cargo: false,
  transportingKids: false,
  transportingAdults: false,
  towing: false
});

const geography = reactive({
  windy: false,
  hilly: false
});

const fitnessLevel = ref('medium');
const recommendation = ref('');
const recommendationDetails = ref({});

// Cost comparison data
const purchaseCosts = reactive({
  bike: 0,
  car: 35000
});

const maintenanceCosts = reactive({
  bike: 150,
  car: 1200
});

const fuelCosts = reactive({
  bike: 0,
  car: 2500
});

const insuranceCosts = reactive({
  bike: 0,
  car: 1800
});

// Computed properties
const progressPercent = computed(() => {
  return ((currentStep.value - 1) / 3) * 100;
});

const hasSelectedAny = computed(() => {
  return Object.values(transportationNeeds).some(value => value);
});

const needsAssistance = computed(() => {
  // Determine if the user needs electric assistance
  return geography.windy ||
         geography.hilly ||
         fitnessLevel.value === 'low' ||
         transportationNeeds.cargo ||
         transportationNeeds.transportingKids ||
         transportationNeeds.transportingAdults ||
         transportationNeeds.towing;
});

const needsCargo = computed(() => {
  return transportationNeeds.cargo ||
         transportationNeeds.transportingKids ||
         transportationNeeds.transportingAdults ||
         transportationNeeds.towing;
});

// Methods
function toggleNeed(need) {
  transportationNeeds[need] = !transportationNeeds[need];
}

function toggleGeography(type) {
  geography[type] = !geography[type];
}

function setFlatGeography() {
  geography.windy = false;
  geography.hilly = false;
}

function nextStep() {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function calculateRecommendation() {
  if (needsCargo.value) {
    if (needsAssistance.value) {
      if (transportationNeeds.transportingKids || transportationNeeds.transportingAdults) {
        recommendation.value = 'longtail-ebike';
      } else {
        recommendation.value = 'cargo-ebike';
      }
    } else {
      recommendation.value = 'cargo-bike';
    }
  } else {
    if (needsAssistance.value) {
      recommendation.value = 'commuter-ebike';
    } else {
      recommendation.value = 'regular-bike';
    }
  }

  // Set recommendation details
  setRecommendationDetails();

  // Update purchase cost based on the recommendation
  updateBikeCosts();

  // Move to results page
  nextStep();
}

function updateBikeCosts() {
  // Set bike purchase cost based on recommendation
  switch(recommendation.value) {
    case 'regular-bike':
      purchaseCosts.bike = 800;
      maintenanceCosts.bike = 150;
      fuelCosts.bike = 0;
      insuranceCosts.bike = 0;
      break;
    case 'commuter-ebike':
      purchaseCosts.bike = 2500;
      maintenanceCosts.bike = 250;
      fuelCosts.bike = 50; // Electricity cost
      insuranceCosts.bike = 100;
      break;
    case 'cargo-bike':
      purchaseCosts.bike = 1800;
      maintenanceCosts.bike = 200;
      fuelCosts.bike = 0;
      insuranceCosts.bike = 100;
      break;
    case 'cargo-ebike':
      purchaseCosts.bike = 4500;
      maintenanceCosts.bike = 350;
      fuelCosts.bike = 75;
      insuranceCosts.bike = 150;
      break;
    case 'longtail-ebike':
      purchaseCosts.bike = 5000;
      maintenanceCosts.bike = 400;
      fuelCosts.bike = 100;
      insuranceCosts.bike = 200;
      break;
    default:
      purchaseCosts.bike = 1000;
      maintenanceCosts.bike = 150;
      fuelCosts.bike = 0;
      insuranceCosts.bike = 0;
  }
}

function setRecommendationDetails() {
  const details = {
    'regular-bike': {
      title: 'Regular Bicycle',
      image: '/images/bikes/dutch-bike.jpg',
      description: 'A traditional bicycle is perfect for your needs. With your fitness level and local conditions, you\'ll be able to navigate comfortably without electric assistance.',
      features: [
        'Lightweight and maneuverable',
        'Lower cost than electric alternatives',
        'Simple maintenance',
        'No charging required'
      ],
      priceRange: '$300 - $1,000'
    },
    'commuter-ebike': {
      title: 'Commuter Electric Bicycle',
      image: '/images/bikes/gazelle-ebike.jpg',
      description: 'An electric commuter bike is ideal for your situation. The electric assistance will help with hills, wind, or longer distances while maintaining the convenience of a standard bicycle.',
      features: [
        'Electric motor assists up to 20-28 mph',
        'Helps overcome hills and wind resistance',
        'Reduces sweat during commutes',
        '20-50 mile range per charge'
      ],
      priceRange: '$1,500 - $4,000'
    },
    'cargo-bike': {
      title: 'Cargo Bicycle',
      image: '/images/bikes/urban-arrow.jpg',
      description: 'A cargo bike will address your carrying needs. These bikes are designed to handle loads while maintaining stability and ease of use.',
      features: [
        'Built-in storage options',
        'Stable frame design for carrying loads',
        'Can transport goods, groceries, or equipment',
        'Options for front buckets or rear platforms'
      ],
      priceRange: '$1,000 - $2,500'
    },
    'cargo-ebike': {
      title: 'Electric Cargo Bicycle (Bucket Style)',
      image: '/images/bikes/urban-arrow.jpg',
      description: 'An electric cargo bike with front loading design is perfect for your needs. The electric assistance makes hauling cargo easier, while the bucket design is ideal for groceries and goods.',
      features: [
        'Large front cargo area for groceries or goods',
        'Electric assist makes carrying loads easier',
        'Stable even when fully loaded',
        'Can replace a car for most errands'
      ],
      priceRange: '$3,000 - $6,000'
    },
    'longtail-ebike': {
      title: 'Electric Longtail Cargo Bicycle',
      image: '/images/bikes/tern-gsd-500.jpg',
      description: 'A longtail electric cargo bike is ideal for transporting people. The extended rear section provides seating for children or adults while electric assistance makes the ride effortless.',
      features: [
        'Extended rear deck for passengers',
        'Electric assist makes carrying passengers easier',
        'Can accommodate child seats or passenger seating',
        'High weight capacity'
      ],
      priceRange: '$3,500 - $8,000'
    }
  };

  recommendationDetails.value = details[recommendation.value];
}

function getTotalCost(type) {
  // Calculate 5-year total cost (purchase + 5 years of annual costs)
  return purchaseCosts[type] +
         (maintenanceCosts[type] * 5) +
         (fuelCosts[type] * 5) +
         (insuranceCosts[type] * 5);
}

function getSavingsAmount() {
  return getTotalCost('car') - getTotalCost('bike');
}

function getCostFormatted(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function restartAssessment() {
  // Reset all values
  currentStep.value = 1;
  Object.keys(transportationNeeds).forEach(key => {
    transportationNeeds[key] = false;
  });
  Object.keys(geography).forEach(key => {
    geography[key] = false;
  });
  fitnessLevel.value = 'medium';
  recommendation.value = '';
}
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

.page-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  font-size: 1.2rem;
  color: #555;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #2c8a57;
}

.assessment-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #2c8a57;
  transition: width 0.3s ease;
}

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

.option-description {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.fitness-card {
  padding: 2rem 1.5rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-prev,
.btn-next,
.btn-restart,
.btn-details {
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

/* Results styles */
.results-container {
  text-align: center;
}

.result-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  text-align: left;
}

.result-image {
  margin-bottom: 1.5rem;
  text-align: center;
}

.result-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.result-content h3 {
  font-size: 1.5rem;
  color: #2c8a57;
  margin-bottom: 1rem;
}

.result-description {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-list {
  margin: 1.5rem 0;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.feature-icon {
  color: #2c8a57;
  font-weight: bold;
  margin-right: 0.75rem;
}

.price-range {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

/* Savings Section Styles */
.savings-section {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.savings-section h3 {
  color: #2c8a57;
  margin-bottom: 0.5rem;
}

.savings-intro {
  color: #7f8c8d;
  margin-bottom: 2rem;
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

.savings-benefits ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.savings-benefits li {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (min-width: 768px) {
  .result-card {
    flex-direction: row;
    align-items: flex-start;
  }

  .result-image {
    flex: 0 0 40%;
    margin-right: 2rem;
    margin-bottom: 0;
  }

  .result-content {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .assessment-container {
    padding: 1.5rem;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .navigation-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-prev, .btn-next, .btn-restart, .btn-details {
    width: 100%;
  }

  .savings-highlight {
    flex-direction: column;
    text-align: center;
  }

  .savings-benefits ul {
    display: inline-block;
    text-align: left;
  }
}
</style>