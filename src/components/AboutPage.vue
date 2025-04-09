<template>
  <div class="about-container">
    <h1>About EBike Calculator</h1>
    
    <section class="about-section">
      <h2>Our Mission</h2>
      <p>At EBike Calculator, we're passionate about helping people discover the benefits of cycling as a sustainable, healthy, and cost-effective transportation alternative. Our mission is to provide tools and information that make it easy for anyone to evaluate whether a bicycle could replace some or all of their car trips.</p>
    </section>
    
    <section class="about-section">
      <h2>Why Cycling?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <h3>Financial Savings</h3>
          <p>Save thousands annually on fuel, car payments, insurance, maintenance, and parking fees.</p>
        </div>
        <div class="benefit-card">
          <h3>Health Benefits</h3>
          <p>Incorporate physical activity into your daily routine, improving cardiovascular health and mental wellbeing.</p>
        </div>
        <div class="benefit-card">
          <h3>Environmental Impact</h3>
          <p>Reduce your carbon footprint and contribute to cleaner air in your community.</p>
        </div>
        <div class="benefit-card">
          <h3>Community Connection</h3>
          <p>Experience your neighborhood at a human pace and connect more with your local community.</p>
        </div>
      </div>
    </section>
    
    <section class="about-section">
      <h2>Types of Bikes We Consider</h2>
      <div class="bike-types">
        <div class="bike-type">
          <h3>Conventional Bicycles</h3>
          <p>Traditional bikes powered entirely by human effort - efficient, low-cost, and perfect for shorter trips and flat terrain.</p>
        </div>
        <div class="bike-type">
          <h3>Electric Bicycles</h3>
          <p>Bikes with electric motor assistance that make longer commutes, hills, and cargo transport more accessible to more people.</p>
        </div>
        <div class="bike-type">
          <h3>Cargo Bikes</h3>
          <p>Specialized bikes designed to carry heavier loads, children, groceries, and other items that might otherwise require a car.</p>
        </div>
      </div>
    </section>
    
    <section class="about-section">
      <h2>How Our Calculator Works</h2>
      <p>Our calculator takes into account your specific transportation needs, local conditions, and personal preferences to help you understand:</p>
      <ul>
        <li>Which trips you currently make by car could reasonably be replaced by bicycle</li>
        <li>What type of bicycle might best suit your needs</li>
        <li>How much money you could save over time</li>
        <li>The environmental impact of making this switch</li>
        <li>Health benefits you might experience</li>
      </ul>
    </section>
    
    <section class="about-section contact">
      <h2>Contact Us</h2>
      <p>Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:info@ebike-calculator.com">info@ebike-calculator.com</a>.</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/scss/variables' as vars;

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: vars.$primary;
  text-align: center;
  margin-bottom: 2rem;
}

.about-section {
  margin-bottom: 3rem;
}

h2 {
  color: vars.$primary;
  margin-bottom: 1rem;
  border-bottom: 2px solid vars.$bg-bike-type;
  padding-bottom: 0.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.benefit-card {
  background-color: vars.$bg-body;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: vars.$primary;
    margin-bottom: 0.75rem;
  }
}

.bike-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.bike-type {
  background-color: vars.$bg-bike-type;
  border-radius: 8px;
  padding: 1.5rem;
  
  h3 {
    color: vars.$primary;
    margin-bottom: 0.75rem;
  }
}

ul {
  list-style-position: inside;
  margin-left: 1rem;
  margin-top: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.contact {
  text-align: center;
  background-color: vars.$bg-body;
  padding: 2rem;
  border-radius: 8px;
  
  a {
    color: vars.$primary;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>