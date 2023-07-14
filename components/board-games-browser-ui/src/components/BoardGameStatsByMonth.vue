<template>
  <div>
    <div v-for="yearGroup in groupedByYear" :key="yearGroup?.[0]?.yearCode">
      <h3>{{ yearGroup?.[0]?.dateCode?.substring(0, 4) }}</h3>
      <line-chart :chart-data="chartDataFor(yearGroup)" />
      <ul>
        <li v-for="month in yearGroup" :key="month.dateCode">
          <router-link :to="statsLink(month)">{{ month.dateCode }}</router-link>
        </li>
      </ul>
    </div>
    <p v-if="loading">
      <LoadingSpinner>Loading months in use from API...</LoadingSpinner>
    </p>
  </div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'

import LoadingSpinner from './LoadingSpinner.vue'
import LineChart from '../charts/LineChart.vue'


const { boardgamesApiUrl } = sharedModel.state
const statsUrl = `${boardgamesApiUrl}/api/boardgame/stats`

export default {
  components: { LoadingSpinner, LineChart },
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
    },
    chartDataFor(yearGroup) {
      console.log('Year group:', JSON.parse(JSON.stringify(yearGroup)))
      const example = {
        labels: ['January', 'February', 'March', /* ... */],
        datasets: [
          {
            label: 'Hannah',
            data: [10, 8, 5, /* ... */],
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'John',
            data: [5, 7, 9, /* ... */],
            borderColor: 'red',
            fill: false
          }
        ]
      }
      return {
        labels: yearGroup.map(month => month.title.substring(0, 3)),
        datasets: [{
          label: 'Average Games Played per Day',
          data: yearGroup.map(month => month.averageGamesPlayedPerDay),
          borderColor: '#999'
        }]
      }
    }
  },
  async mounted() {
    this.loading = true
    const allStats = await modelCache.get(statsUrl)
    this.monthsInUse = allStats.byMonth.sort((a, b) => a?.dateCode?.localeCompare(b?.dateCode)).reverse()
    this.loading = false
  }
}
</script>