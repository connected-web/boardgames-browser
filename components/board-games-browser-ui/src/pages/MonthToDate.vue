<template>
  <div class="by-month-to-date">
    <h1>Stats by Month to Date</h1>
    
    <p class="breadcrumbs">
      <router-link :to="`/stats/by-month/`">Stats by Month</router-link>
      /
      <span>{{ currentMonth }} to Today</span>
    </p>

    <BoardGameStatsViewer datasourceUrl="https://boardgames-api.calisaurus.net/api/boardgame/stats/byMonth/toDate" />

    <div class="continuations">
      <div class="previous">
        <router-link :to="`/stats/by-month/${previousMonth}`">&larr; {{ previousMonth }}</router-link>
      </div>
      <div class="next">

      </div>
    </div>
  </div>
</template>

<script>
import BoardGameStatsViewer from '../components/BoardGameStatsViewer.vue'
import dayjs from 'dayjs'

export default {
  components: { BoardGameStatsViewer },
  computed: {
    currentMonth() {
      return dayjs().format('YYYY-MM')
    },
    previousMonth() {
      const lastMonth = dayjs().subtract(1, 'month')
      return dayjs(lastMonth).format('YYYY-MM')
    }
  }
}
</script>