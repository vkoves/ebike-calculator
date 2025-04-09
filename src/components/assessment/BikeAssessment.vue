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
        <transportation-needs-step
          v-if="currentStep === 1"
          key="step1"
          v-model="transportationNeeds"
          @next="nextStep"
        />
        
        <!-- Step 2: Geography -->
        <geography-step
          v-else-if="currentStep === 2"
          key="step2"
          v-model="geography"
          @prev="prevStep"
          @next="nextStep"
        />
        
        <!-- Step 3: Fitness Level -->
        <fitness-step
          v-else-if="currentStep === 3"
          key="step3"
          v-model="fitnessLevel"
          @prev="prevStep"
          @calculate="calculateRecommendation"
        />
        
        <!-- Step 4: Results -->
        <div v-else-if="currentStep === 4" key="step4" class="step-container results-container">
          <h2>Your Recommended Bike Type</h2>
          
          <bike-recommendation 
            :recommendation-details="recommendationDetails"
            :all-bike-types="bikeTypeDetails"
            @bike-change="handleBikeChange"
          />
          
          <savings-comparison
            :bike-title="recommendationDetails.title"
            :bike-image="recommendationDetails.image"
            :costs="costs"
            :all-bike-types="bikeTypeDetails"
            :selected-bike-type="recommendation.value"
            @bike-change="handleBikeChange"
            key="savings-component"
          />
          
          <results-footer @restart="restartAssessment" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import TransportationNeedsStep from './TransportationNeedsStep.vue';
import GeographyStep from './GeographyStep.vue';
import FitnessStep from './FitnessStep.vue';
import BikeRecommendation from './BikeRecommendation.vue';
import SavingsComparison from './SavingsComparison.vue';
import ResultsFooter from './ResultsFooter.vue';

// State
const currentStep = ref(1);
// Use ref with an object inside instead of reactive directly
const transportationNeeds = ref({
  soloCommuting: false,
  cargo: false,
  transportingKids: false,
  transportingAdults: false
});

// Use ref with an object inside instead of reactive directly
const geography = ref({
  windy: false,
  hilly: false
});

const fitnessLevel = ref('medium');

// Watch for changes to help debug
watch(transportationNeeds, (newVal) => {
  console.log('transportationNeeds changed:', newVal);
}, { deep: true });

watch(geography, (newVal) => {
  console.log('geography changed:', newVal);
}, { deep: true });

watch(fitnessLevel, (newVal) => {
  console.log('fitnessLevel changed:', newVal);
});
const recommendation = ref('');
const recommendationDetails = ref({});

// Cost comparison data
const costs = reactive({
  bike: {
    purchase: 0,
    maintenance: 150,
    fuel: 0,
    insurance: 0
  },
  car: {
    purchase: 35000,
    maintenance: 1200,
    fuel: 2500,
    insurance: 1800
  }
});

// All bike type details
const bikeTypeDetails = reactive({
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
});

// Computed properties
const progressPercent = computed(() => {
  return ((currentStep.value - 1) / 3) * 100;
});

const needsAssistance = computed(() => {
  // Determine if the user needs electric assistance
  return geography.value.windy || 
         geography.value.hilly || 
         fitnessLevel.value === 'low' ||
         transportationNeeds.value.cargo ||
         transportationNeeds.value.transportingKids ||
         transportationNeeds.value.transportingAdults;
});

const needsCargo = computed(() => {
  return transportationNeeds.value.cargo || 
         transportationNeeds.value.transportingKids || 
         transportationNeeds.value.transportingAdults;
});

// Methods
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
      if (transportationNeeds.value.transportingKids || transportationNeeds.value.transportingAdults) {
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
  
  console.log('Calculated recommendation:', recommendation.value);

  // Set recommendation details
  setRecommendationDetails();
  
  // Update purchase cost based on the recommendation
  updateBikeCosts(recommendation.value);
  
  // Move to results page
  nextStep();
}

function updateBikeCosts(bikeType = null) {
  // Use the passed bike type or the current recommendation
  const typeToUse = bikeType || recommendation.value;
  
  // Set bike purchase cost based on bike type
  switch(typeToUse) {
    case 'regular-bike':
      costs.bike.purchase = 800;
      costs.bike.maintenance = 150;
      costs.bike.fuel = 0;
      costs.bike.insurance = 0;
      break;
    case 'commuter-ebike':
      costs.bike.purchase = 2500;
      costs.bike.maintenance = 250;
      costs.bike.fuel = 50; // Electricity cost
      costs.bike.insurance = 100;
      break;
    case 'cargo-bike':
      costs.bike.purchase = 1800;
      costs.bike.maintenance = 200;
      costs.bike.fuel = 0;
      costs.bike.insurance = 100;
      break;
    case 'cargo-ebike':
      costs.bike.purchase = 4500;
      costs.bike.maintenance = 350;
      costs.bike.fuel = 75;
      costs.bike.insurance = 150;
      break;
    case 'longtail-ebike':
      costs.bike.purchase = 5000;
      costs.bike.maintenance = 400;
      costs.bike.fuel = 100;
      costs.bike.insurance = 200;
      break;
    default:
      costs.bike.purchase = 1000;
      costs.bike.maintenance = 150;
      costs.bike.fuel = 0;
      costs.bike.insurance = 0;
  }
  
  console.log(`Updated costs for bike type: ${typeToUse}`, costs.bike);
}

function setRecommendationDetails() {
  recommendationDetails.value = bikeTypeDetails[recommendation.value];
}

// Handle bike change from the dropdown
function handleBikeChange(bikeType) {
  console.log('BikeAssessment received bike change:', bikeType);
  
  if (!bikeType) {
    // Restore original bike costs and details for the recommended bike
    updateBikeCosts(recommendation.value);
    recommendationDetails.value = bikeTypeDetails[recommendation.value];
    return;
  }
  
  // Update costs and details based on selected bike type
  updateBikeCosts(bikeType);
  recommendationDetails.value = {...bikeTypeDetails[bikeType]};
  console.log('Updated bike details to:', bikeType, recommendationDetails.value);
}

function restartAssessment() {
  // Reset all values
  currentStep.value = 1;
  
  // Reset transportationNeeds
  transportationNeeds.value = {
    soloCommuting: false,
    cargo: false,
    transportingKids: false,
    transportingAdults: false
  };
  
  // Reset geography
  geography.value = {
    windy: false,
    hilly: false
  };
  
  fitnessLevel.value = 'medium';
  recommendation.value = '';
  
  console.log('Assessment restarted', { 
    transportationNeeds: transportationNeeds.value,
    geography: geography.value,
    fitnessLevel: fitnessLevel.value
  });
}
</script>

<style lang="scss" scoped>
@use "sass:color";
@use '../../assets/scss/variables' as vars;

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
  color: vars.$text-secondary;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: vars.$primary;
}

.assessment-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: vars.$bg-card;
  border-radius: 12px;
  box-shadow: vars.$shadow-sm;
}

.progress-bar {
  height: 8px;
  background-color: vars.$lighter-gray;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: vars.$primary;
  transition: width 0.3s ease;
}

.step-container {
  margin-bottom: 2rem;
}

.results-container {
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: vars.$dark;
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

@media (max-width: 600px) {
  .assessment-container {
    padding: 1.5rem;
  }
}
</style>