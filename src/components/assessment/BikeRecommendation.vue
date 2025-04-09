<template>
  <div class="recommendation-section">
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
  </div>
</template>

<script setup>
defineProps({
  recommendationDetails: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.recommendation-section {
  margin-bottom: 2rem;
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
</style>