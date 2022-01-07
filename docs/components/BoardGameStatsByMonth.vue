<template>
  <div>
    <ul v-if="monthsInUse">
      <li v-for="month in monthsInUse" :key="month.dateCode">{{ month.dateCode }}</li>
    </ul>
    <p v-else>Loading months in use from API...</p>
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
      monthsInUse: false
    }
  },
  async mounted() {
    const allStats = await modelCache.get(statsUrl)
    this.monthsInUse = allStats.byMonth
  }
}
</script>