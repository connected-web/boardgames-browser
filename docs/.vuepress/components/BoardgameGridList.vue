<template>
<div class="boardgame-list">
  <p v-if="message">{{ $data.message }}</p>
  <ul>
    <li v-for="dateCode in gridDateCodes" :key="dateCode"><a :href="gridLink(dateCode)">{{ dateCode }}</a></li>
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
    this.$data.message = `${this.$data.gridDateCodes.length} grids available:`
  },
  methods: {
    gridLink(dateCode) {
      return `/boardgames-browser/grids/byYear/?dateCode=${dateCode}`
    }
  }
}

</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>