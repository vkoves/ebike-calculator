<template>
  <div class="home-page">
    <!-- Landing Section with Bike Cards -->
    <div class="landing-container">
      <h1>Discover Your Perfect Ride</h1>
      <p class="subtitle">Find out if cycling could replace some of your car trips, improve your health, and save you money.</p>
      
      <div class="bikes-showcase">
        <div class="bike-card">
          <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="City Bike" class="bike-image">
          <div class="bike-info">
            <h3 class="bike-title">City Commuter</h3>
            <p class="bike-description">Perfect for urban commuting with comfort and style. Navigate through city streets with ease.</p>
          </div>
        </div>
        
        <div class="bike-card">
          <img src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Electric Bike" class="bike-image">
          <div class="bike-info">
            <h3 class="bike-title">Electric Power</h3>
            <p class="bike-description">Effortless rides with electric assistance. Go further, faster, with less effort.</p>
          </div>
        </div>
        
        <div class="bike-card">
          <img src="https://images.unsplash.com/photo-1575585269294-7d28dd912db8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Cargo Bike" class="bike-image">
          <div class="bike-info">
            <h3 class="bike-title">Cargo Carrier</h3>
            <p class="bike-description">Haul groceries, kids, or supplies. The SUV of bicycles for practical everyday use.</p>
          </div>
        </div>
      </div>
      
      <button class="cta-button" @click="scrollToCalculator">Calculate Your Savings</button>
    </div>

    <!-- Calculator Section -->
    <div class="calculator-section" id="calculator">
      <div class="container">
        <main>
          <section class="intro">
            <p>Welcome to our site dedicated to helping you discover the benefits of cycling.</p>
            <p>We'll ask about your transportation needs and help you see if a bike could help replace some car trips and save money.</p>
          </section>
          <section class="benefits">
            <h2>Benefits of choosing a bike:</h2>
            <ul>
              <li>Save money on fuel, parking, and vehicle maintenance</li>
              <li>Improve your physical and mental health</li>
              <li>Reduce your environmental impact</li>
              <li>Avoid traffic congestion</li>
            </ul>
          </section>
          <div class="cta">
            <button>Start Your Assessment</button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
function scrollToCalculator() {
  document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
/* Landing Styles */
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.landing-container h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: #34495e;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
}

.bikes-showcase {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  max-width: 1200px;
}

.bike-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  width: 300px;
  transition: transform 0.3s ease;
}

.bike-card:hover {
  transform: translateY(-5px);
}

.bike-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.bike-info {
  padding: 1.5rem;
}

.bike-title {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.bike-description {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.cta-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #2980b9;
}

/* Calculator Section Styles */
.calculator-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.intro p {
  margin-bottom: 1rem;
}

.benefits {
  background-color: #e9f7ef;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-position: inside;
  margin-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.cta {
  text-align: center;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .landing-container h1 {
    font-size: 2rem;
  }
  .bikes-showcase {
    flex-direction: column;
    align-items: center;
  }
  .bike-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>