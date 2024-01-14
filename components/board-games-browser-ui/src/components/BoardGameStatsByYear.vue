<template>
  <div>
    <div v-for="decadeGroup in groupedByDecade" :key="decadeGroup?.[0]?.yearCode">
      <h3>{{ decadeGroup?.[0]?.dateCode?.substring(0, 3) + '0' }}s</h3>
      <ul>
        <li v-for="year in decadeGroup" :key="year.dateCode">
          <router-link :to="statsLink(year)">{{ year.dateCode }}</router-link>
        </li>
      </ul>
    </div>
    <p v-if="loading">
      <LoadingSpinner>Loading years in use from API...</LoadingSpinner>
    </p>
  </div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'
import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesApiUrl } = sharedModel.state
const statsUrl = `${boardgamesApiUrl}/api/boardgame/stats/allYears`

export default {
  data() {
    return {
      loading: false,
      yearsInUse: null
    };
  },
  computed: {
    groupedByDecade() {
      const { yearsInUse } = this
      const items = yearsInUse ?? []
      return items.reduce((acc, item) => {
        const decade = item?.dateCode?.substring(0, 3)
        let currentGroup = acc[acc.length - 1] ?? []
        const currentDecade = (currentGroup[0] ?? '')?.dateCode?.substring(0, 3)
        if (currentDecade !== decade) {
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
      return `/stats/by-year/${item.dateCode}`
    }
  },
  async mounted() {
    this.loading = true
    const allStats = await modelCache.get(statsUrl)
    this.yearsInUse = allStats.byYear.sort((a, b) => a?.dateCode?.localeCompare(b?.dateCode)).reverse()
    this.loading = false
  },
  components: { LoadingSpinner }
}
</script>
