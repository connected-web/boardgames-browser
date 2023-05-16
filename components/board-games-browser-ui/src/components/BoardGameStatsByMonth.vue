<template>
  <div>
    <div v-for="yearGroup in groupedByYear" :key="yearGroup?.[0]?.yearCode">
      <h3>{{ yearGroup?.[0]?.dateCode?.substring(0, 4) }}</h3>
      <ul>
        <li v-for="month in yearGroup" :key="month.dateCode">
          <router-link :to="statsLink(month)">{{ month.dateCode }}</router-link>
        </li>
      </ul>
    </div>
    <LoadingSpinner v-if="loading">Loading months in use from API...</LoadingSpinner>
  </div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'
import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesApiUrl } = sharedModel.state
const statsUrl = `${boardgamesApiUrl}/api/boardgame/stats`

export default {
  data() {
    return {
      loading: false,
      monthsInUse: null
    };
  },
  computed: {
    groupedByYear() {
      const { monthsInUse } = this
      const items = monthsInUse ?? []
      return items.reduce((acc, item) => {
        const year = item?.dateCode?.substring(0, 4)
        let currentGroup = acc[acc.length - 1] ?? []
        const currentYear = (currentGroup[0] ?? '')?.dateCode?.substring(0, 4)
        if (currentYear !== year) {
          currentGroup = []
          acc.push(currentGroup)
        }
        currentGroup.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    statsLink(item) {
      return `/stats/by-month/${item.dateCode}`
    }
  },
  async mounted() {
    this.loading = true
    const allStats = await modelCache.get(statsUrl)
    this.monthsInUse = allStats.byMonth.sort((a, b) => a?.dateCode?.localeCompare(b?.dateCode)).reverse()
    this.loading = false
  },
  components: { LoadingSpinner }
}
</script>