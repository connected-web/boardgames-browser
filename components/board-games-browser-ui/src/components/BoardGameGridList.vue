<template>
<div class="boardgame-list">
  <p v-if="message">{{ message }}</p>
  <ul>
    <li v-for="dateCode in gridDateCodes" :key="dateCode">
      <router-link :to="gridLink(dateCode)">{{ dateCode }}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      gridDateCodes: ['2018', '2020', '2021'],
      message: false
    }
  },
  async beforeMount() { 
    this.message = `${this.gridDateCodes.length} grids available:`
  },
  methods: {
    gridLink(dateCode) {
      return `/stats/grids/${dateCode}`
    }
  }
}

</script>

<style scoped>
.boardgame-list {
  border-top: 2px solid #EEE;
}
</style>