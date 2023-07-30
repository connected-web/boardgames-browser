<template>
  <div class="by-month">
    <h1>Stats by Month</h1>

    <p class="breadcrumbs">
      <router-link :to="`/stats/by-month/`">Stats by Month</router-link>
      /
      <span v-if="dateCode">{{ currentMonth }}</span>
      <span v-else>Index</span>
    </p>

    <BoardGameStatsByDate v-if="dateCode" :dateCode="dateCode" />
    <BoardGameStatsByMonth v-else />
    
    <div class="continuations">
      <div class="previous">
        <router-link v-if="dateCode && previousMonthBeforeRecordsBegan === false" :to="`/stats/by-month/${previousMonth}`">&larr; {{ previousMonth }}</router-link>
      </div>
      <div class="next">
        <router-link v-if="dateCode && nextMonthInFuture === false" :to="`/stats/by-month/${nextMonth}`">{{ nextMonth }} &rarr;</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import BoardGameStatsByMonth from '../components/BoardGameStatsByMonth.vue'
import BoardGameStatsByDate from '../components/BoardGameStatsByDate.vue'

export default {
  props: {
    dateCode: {
      type: String,
      default: null
    }
  },
  components: { BoardGameStatsByDate, BoardGameStatsByMonth },
  computed: {
    currentMonth() {
      const { dateCode } = this
      return dayjs(dateCode).format('YYYY-MM')
    },
    previousMonth() {
      const { dateCode } = this
      const previousMonth = dayjs(dateCode).subtract(1, 'month')
      return dayjs(previousMonth).format('YYYY-MM')
    },
    previousMonthBeforeRecordsBegan() {
      const { previousMonth } = this
      const now = new Date()
      return dayjs(previousMonth).isBefore('2018-01')
    },
    nextMonth() {
      const { dateCode } = this
      const previousMonth = dayjs(dateCode).add(1, 'month')
      return dayjs(previousMonth).format('YYYY-MM')
    },
    nextMonthInFuture() {
      const { nextMonth } = this
      const now = new Date()
      return dayjs(nextMonth).isAfter(now)
    }
  }
}
</script>