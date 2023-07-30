<template>
  <div :class="{ sidenav: true, show }">
    <router-link to="/">Home</router-link>

    <label>Games</label>
    <router-link to="/games/by-name">By Name</router-link>
    <router-link to="/games/by-tag">By Tag</router-link>

    <label>Stats</label>
    <router-link to="/stats/grids">Grids</router-link>
    <router-link to="/graphs/by-month">Graphs</router-link>
    <router-link to="/stats/by-month">By Month</router-link>
    <router-link to="/stats/month-to-date">Month to Date</router-link>
    <router-link to="/stats/by-year">By Year</router-link>
    <router-link to="/stats/year-to-date">Year to Date</router-link>

    <label>API</label>
    <router-link to="/api/track">Track</router-link>
    <router-link to="/api/review">Review</router-link>
    <router-link to="/api/authenticate">Authenticate</router-link>

    <label>Testing</label>
    <router-link to="/api/api-testing">Services API</router-link>

    <label>Extras</label>
    <router-link to="/extras/icons">Icon Browser</router-link>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      screenSize: null
    }
  },
  setup() {
    return {
      screenSize: inject('screenSize')
    }
  }
}
</script>

<style scoped>
  .sidenav {
    display: flex;
    flex-direction: column;
    gap: 1px;
    justify-content: flex-start;
    min-width: 200px;
    width: 200px;
    max-width: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 2px solid #ddd;
    transition: min-width 200ms ease-in-out, max-width 200ms ease-in-out, width 200ms ease-in-out, background-color 200ms ease-in-out;
    z-index: 100;
  }
  .sidenav > * {
    white-space: nowrap;
  }
  
  .sidenav > label {
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 600;
    color: #666;
  }
  .sidenav > a {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
  }
  
  @media only screen and (max-width: 768px) {
    .sidenav {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      min-width: 0;
      width: 0;
      max-width: 0;
      overflow: hidden;
      background: #666;
      transition: min-width 200ms ease-in-out, max-width 200ms ease-in-out, width 200ms ease-in-out, background-color 200ms ease-in-out;
    }
    .sidenav.show {
      min-width: 100%;
      max-width: 100%;
      background: rgb(255, 255, 255);
    }
    .sidenav > * {
      display: none;
      white-space: nowrap;
    }    
    .sidenav.show > * {
      display: block;
      white-space: nowrap;
    }   
  }
  </style>