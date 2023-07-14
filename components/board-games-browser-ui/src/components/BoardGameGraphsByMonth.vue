<template>
  <div>
    <div class="dataset options">
      <button v-for="item in expectedFields" :key="item.field" :style="filterList.includes(item.field) ? `outline: 2px solid ${item.color}; outline-offset: -2px;` : ``"
        @click="toggleFilter(item.field)">
        <label>{{ item.label }}</label>
      </button>
      <button v-if="filterList.length > 0" @click="$router.push('/graphs/by-month')">Clear</button>
    </div>
    <div v-for="yearGroup in groupedByYear" :key="yearGroup?.[0]?.yearCode">
      <h3>{{ yearGroup?.[0]?.dateCode?.substring(0, 4) }}</h3>
      <line-chart :chart-data="chartDataFor(yearGroup)" />
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
import StatValue from './StatValue.vue'

const { boardgamesApiUrl } = sharedModel.state
const statsUrl = `${boardgamesApiUrl}/api/boardgame/stats`

const expectedFields = [{
  label: 'Average Games Played per Day',
  field: 'averageGamesPlayedPerDay',
  color: '#4CAF50'
}, {
  label: 'Co-op Game Loses',
  field: 'coOpGameLoses',
  color: '#616161'
}, {
  label: 'Co-op Game Wins',
  field: 'coOpGameWins',
  color: '#66BB6A'
}, {
  label: 'Co-op Games Played #',
  field: 'coOpGamesPlayedCount',
  color: '#2196F3'
}, {
  label: 'Co-op Games Played %',
  field: 'coOpGamesPlayedPercentage',
  color: '#2196F3'
}, {
  label: 'Co-op Loss Rate',
  field: 'coOpLossRate',
  color: '#616161'
}, {
  label: 'Co-op Win Rate',
  field: 'coOpWinRate',
  color: '#4CAF50'
}, {
  label: 'Days with Unplayed Games',
  field: 'daysWithUnplayedGames',
  color: '#FFEB3B'
}, {
  label: 'Unique Games Played #',
  field: 'uniqueGamesPlayedCount',
  color: '#9C27B0'
}, {
  label: 'Unique Games Played %',
  field: 'uniqueGamesPlayedPercentage',
  color: '#9C27B0'
}, {
  label: 'Win # Draw',
  field: 'winCountDraw',
  color: '#FDD835'
}, {
  label: 'Win # Hannah',
  field: 'winCountHannah',
  color: '#7E57C2'
}, {
  label: 'Win # John',
  field: 'winCountJohn',
  color: '#FF5252'
}, {
  label: 'Win # Other',
  field: 'winCountOther',
  color: '#795548'
}, {
  label: 'Win % Draw',
  field: 'winPercentageDraw',
  color: '#FDD835'
}, {
  label: 'Win % Hannah',
  field: 'winPercentageHannah',
  color: '#7E57C2'
}, {
  label: 'Win % John',
  field: 'winPercentageJohn',
  color: '#FF5252'
}, {
  label: 'Win % Other',
  field: 'winPercentageOther',
  color: '#795548'
}, {
  label: 'Winnable Games Total',
  field: 'winnableGamesTotal',
  color: '#3F51B5'
}]

export default {
  components: { LoadingSpinner, LineChart, StatValue },
  props: {
    filters: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      monthsInUse: null,
      expectedFields
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
    },
    filterList() {
      return (this.filters ?? '').split(',').filter(n => n)
    }
  },
  methods: {
    statsLink(item) {
      return `/stats/by-month/${item.dateCode}`
    },
    chartDataFor(yearGroup) {
      const yearGroupCopy =  JSON.parse(JSON.stringify(yearGroup))
      const fieldsInUse = expectedFields.filter(item => this.filterList.includes(item.field))
      yearGroupCopy.sort((a, b) => {
        const da = new Date(a.dateCode)
        const db = new Date(b.dateCode)
        return da.getTime() > db.getTime() ? 1 : -1
      })
      const fieldsToUse = fieldsInUse.length > 0 ? fieldsInUse : expectedFields.filter(item => item.field === 'winnableGamesTotal')
      const datasets = fieldsToUse.map(item => {
        return {
          label: item.label,
          data: yearGroupCopy.map(month => month[item.field]),
          borderColor: item.color
        }
      })
      return {
        labels: yearGroupCopy.map(month => month.title.substring(0, 3)),
        datasets
      }
    },
    toggleFilter(field) {
      const { filters } = this
      const list = (filters ?? '').split(',')
      let newFilters
      if (list.includes(field)) {
        newFilters = list.filter(item => item !== field)
      } else {
        list.push(field)
        newFilters = list
      }
      this.$router.push(`/graphs/by-month/${newFilters.filter(n => n).join(',')}`)
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

<style>
div.dataset.options {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
div.dataset.options > button {
  font-size: 0.85em;
  margin: 0;
  white-space: nowrap;

}
</style>