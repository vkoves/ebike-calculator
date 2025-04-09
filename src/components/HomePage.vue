<template>
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
</template>

<style scoped>
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
</style>