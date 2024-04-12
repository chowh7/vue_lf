<template>
  <div id="app">
    <header class="site-header">
      <h2>Looking For</h2>
    </header>
    <nav class="navbar">
      <router-link class="navlink" to="/">Home</router-link>
      <router-link class="navlink" to="/searchitem">Search Item</router-link>
      <router-link class="navlink" to="/reportitem">Report Item</router-link>
      <router-link class="navlink" to="/batchreport">Batch Report</router-link>
      <router-link class="navlink" to="/adminitem">Admin Item</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style>
.site-header {
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
  font-size: 48px;
  letter-spacing: 3px;
  padding: 4px;
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: #87CEFA;
  padding: 4px;
  width: 100%;
}

.navlink {
  color: #FFFFFF;
  text-decoration: none;
  margin-right: 32px;
  transition: color 0.3s;
  font-size: 32px
}

.navlink:hover,
.navlink:focus {
  color: #FFD700;
}
</style>
