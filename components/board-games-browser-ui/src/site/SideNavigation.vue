<template>
  <div class="sidenav">
    <router-link to="/">Home</router-link>

    <label>Games</label>
    <router-link to="/games/by-name">By Name</router-link>
    <router-link to="/games/by-tag">By Tag</router-link>

    <label>Stats</label>
    <router-link to="/stats/grids">Grids</router-link>
    <router-link to="/stats/by-month">By Month</router-link>
    <router-link to="/stats/month-to-date">Month to Date</router-link>
    <router-link to="/stats/by-year">By Year</router-link>
    <router-link to="/stats/year-to-date">Year to Date</router-link>

    <label>API</label>
    <router-link to="/api/track">Track</router-link>
    <router-link to="/api/review">Review</router-link>
    <router-link to="/api/authenticate">Authenticate</router-link>

    <label>Extras</label>
    <router-link to="/extras/icons">Icon Browser</router-link>
  </div>
</template>

<style scoped>
.sidenav {
  display: flex;
  flex-direction: column;
  gap: 1px;
  justify-content: flex-start;
  width: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 2px solid #eee;
}

.sidenav > label {
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 600;
  color: #333;
}
.sidenav > a {
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
</style>