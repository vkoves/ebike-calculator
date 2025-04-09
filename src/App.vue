<template>
  <div class="container">
    <header>
      <h1>Can a bike be right for you?</h1>
    </header>
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
    <footer>
      <p>© 2025 - Can a bike be right for you?</p>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #2c8a57;
  font-size: 2.5rem;
  margin-bottom: 1rem;
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

h2 {
  color: #2c8a57;
  margin-bottom: 1rem;
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

button {
  background-color: #2c8a57;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #236b45;
}

footer {
  text-align: center;
  margin-top: 2rem;
  color: #666;
  font-size: 0.9rem;
}
</style>