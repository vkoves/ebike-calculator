<template>
  <div class="home-page">
    <div class="hero-container">
      <div class="hero-content">
        <h1>Discover Your Perfect Ride</h1>
        <p class="subtitle">Find out if cycling could replace some of your car trips, improve your health, and save you money.</p>
        
        <div class="benefits-summary">
          <div class="benefit-item">
            <div class="benefit-icon">💰</div>
            <div>Save money</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">🌍</div>
            <div>Reduce emissions</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">❤️</div>
            <div>Improve health</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⏱️</div>
            <div>Save time</div>
          </div>
        </div>
        
        <button class="cta-button" @click="startAssessment">Find Your Perfect Bike</button>
      </div>
      
      <div class="bike-showcase">
        <div class="carousel-3d-container">
          <div class="carousel-3d" :style="{ transform: 'rotateY(' + currentRotation + 'deg)' }">
            <div class="carousel-item" :style="{ transform: 'rotateY(0deg) translateZ(250px)' }">
              <img src="/images/bikes/dutch-bike.jpg" alt="City Bike">
              <div class="caption">City Commuter</div>
            </div>
            <div class="carousel-item" :style="{ transform: 'rotateY(90deg) translateZ(250px)' }">
              <img src="/images/bikes/gazelle-ebike.jpg" alt="Electric Bike">
              <div class="caption">Electric Power</div>
            </div>
            <div class="carousel-item" :style="{ transform: 'rotateY(180deg) translateZ(250px)' }">
              <img src="/images/bikes/tern-gsd-500.jpg" alt="Cargo Bike">
              <div class="caption">Cargo Carrier</div>
            </div>
            <div class="carousel-item" :style="{ transform: 'rotateY(270deg) translateZ(250px)' }">
              <img src="/images/bikes/urban-arrow.jpg" alt="Family Bike">
              <div class="caption">Family Transport</div>
            </div>
          </div>
        </div>
        
        <div class="carousel-controls">
          <button class="control-btn prev" @click="rotateCarousel('prev')" aria-label="Previous bike">
            &#10094;
          </button>
          <button class="control-btn next" @click="rotateCarousel('next')" aria-label="Next bike">
            &#10095;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRotation = ref(0);
const carouselIndex = ref(0);
const autoRotateInterval = ref(null);

function startAssessment() {
  router.push('/assessment');
}

function rotateCarousel(direction) {
  // Stop auto-rotation temporarily when user manually rotates
  if (autoRotateInterval.value) {
    clearInterval(autoRotateInterval.value);
    startAutoRotation(); // Restart the auto-rotation
  }
  
  if (direction === 'next') {
    carouselIndex.value = (carouselIndex.value + 1) % 4;
  } else {
    carouselIndex.value = (carouselIndex.value - 1 + 4) % 4;
  }
  
  // Calculate the rotation angle
  currentRotation.value = -90 * carouselIndex.value;
}

function startAutoRotation() {
  autoRotateInterval.value = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % 4;
    currentRotation.value = -90 * carouselIndex.value;
  }, 5000);
}

onMounted(() => {
  startAutoRotation();
});

onUnmounted(() => {
  if (autoRotateInterval.value) {
    clearInterval(autoRotateInterval.value);
  }
});
</script>

<style scoped>
.home-page {
  height: calc(100vh - 60px); /* Adjust based on header height */
  overflow: hidden;
}

.hero-container {
  height: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-content {
  flex: 1;
  padding: 2rem 4rem;
  max-width: 600px;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.subtitle {
  color: #34495e;
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.benefits-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  font-size: 0.9rem;
}

.benefit-icon {
  font-size: 1.2rem;
}

.cta-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.cta-button:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
}

/* 3D Carousel Styles */
.bike-showcase {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  perspective: 1000px;
}

.carousel-3d-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.carousel-3d {
  position: relative;
  width: 300px;
  height: 350px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

.carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  transform-origin: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-item img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  background-color: white;
  padding: 10px;
  transition: transform 0.3s ease;
}

.carousel-item img:hover {
  transform: scale(1.05);
}

.caption {
  margin-top: 1rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.2rem;
  text-shadow: 0 1px 3px rgba(255,255,255,0.8);
  background-color: rgba(255,255,255,0.7);
  padding: 0.4rem 1rem;
  border-radius: 30px;
}

.carousel-controls {
  position: absolute;
  bottom: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  transform: translateY(50%);
  z-index: 10;
}

.control-btn {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  font-weight: bold;
}

.control-btn:hover {
  background-color: #e0e0e0;
  color: #222;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

.control-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(200, 200, 200, 0.5), 0 4px 8px rgba(0,0,0,0.15);
}

@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
  }
  
  .hero-content {
    max-width: 100%;
    padding: 2rem;
    text-align: center;
    flex: 0 0 auto;
  }
  
  .benefits-summary {
    justify-content: center;
  }
  
  .bike-showcase {
    width: 100%;
    height: 400px;
    margin-bottom: 2rem;
  }
  
  .carousel-controls {
    bottom: 50%;
    transform: translateY(50%);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
  
  .benefit-item {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .bike-showcase {
    height: 300px;
  }
  
  .carousel-3d {
    width: 200px;
    height: 250px;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .carousel-controls {
    padding: 0 1rem;
  }
}
</style>