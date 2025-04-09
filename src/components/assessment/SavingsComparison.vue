<template>
  <div class="savings-section">
    <h3>Potential Savings vs. Car Ownership</h3>
    <p class="savings-intro">See how much you could save by choosing a bike instead of a new car</p>

    <div class="comparison-container">
      <div class="comparison-item bike">
        <div class="comparison-header">
          <img :src="bikeImage" :alt="bikeTitle">
          <h4>{{ bikeTitle }}</h4>
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
import { computed } from 'vue';

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
  }
});

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

.savings-section h3 {
  color: #2c8a57;
  margin-bottom: 0.5rem;
  text-align: center;
}

.savings-intro {
  color: #7f8c8d;
  margin-bottom: 2rem;
  text-align: center;
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
}
</style>