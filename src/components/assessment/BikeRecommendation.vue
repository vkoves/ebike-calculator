<template>
  <div class="recommendation-section">
    <div class="result-card">
      <div class="recommendation-badge">Recommended</div>
      
      <div class="result-image">
        <img :src="recommendationDetails.image" :alt="recommendationDetails.title">
      </div>
      <div class="result-content">
        <div class="title-row">
          <h3>{{ recommendationDetails.title }}</h3>
        </div>
        
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
  position: relative;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
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

.title-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-content h3 {
  font-size: 1.5rem;
  color: #2c8a57;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  flex: 1;
}

.compare-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.compare-selector label {
  font-size: 0.9rem;
  color: #555;
}

.compare-selector select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  min-width: 200px;
}

.compare-selector select:focus {
  outline: none;
  border-color: #2c8a57;
  box-shadow: 0 0 0 2px rgba(44, 138, 87, 0.2);
}

.compare-selector select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.return-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #f8f9fa;
  border: 1px solid #2c8a57;
  color: #2c8a57;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.return-button:hover {
  background-color: #e8f5ee;
}

.comparison-badge,
.recommendation-badge {
  position: absolute;
  top: -10px;
  left: 20px;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.comparison-badge {
  background-color: #3498db;
}

.recommendation-badge {
  background-color: #2c8a57;
}

.original-recommendation {
  border-left: 4px solid #2c8a57;
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

@media (max-width: 768px) {
  .title-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .result-content h3 {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .compare-selector {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .compare-selector select {
    width: 100%;
  }
  
  .comparison-badge,
  .recommendation-badge {
    position: static;
    display: inline-block;
    margin-bottom: 1rem;
  }
}
</style>