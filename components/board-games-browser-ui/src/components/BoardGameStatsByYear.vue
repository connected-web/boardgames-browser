<template>
  <div>
    <ul v-if="yearsInUse">
      <li v-for="year in yearsInUse" :key="year.dateCode"><a :href="statsLink(year)">{{ year.dateCode }}</a></li>
    </ul>
    <p v-else>Loading years in use from API...</p>
  </div>
</template>

<script>
import modelCache from './src/modelCache'
import sharedModel from './src/sharedModel'

const { boardgamesApiUrl } = sharedModel.state
const statsUrl = `${boardgamesApiUrl}/api/boardgame/stats`

export default {
  data() {
    return {
      yearsInUse: false
    }
  },
  methods: {
    statsLink(item) {
      return `/boardgames-browser/stats/by-date.html?dateCode=${item.dateCode}`
    }
  },
  async mounted() {
    const allStats = await modelCache.get(statsUrl)
    this.yearsInUse = allStats.byYear
  }
}
</script>