<template>
  <div class="by-month">
    <h1>Stats by Month</h1>

    <BoardGameStatsByDate v-if="dateCode" :dateCode="dateCode" />
    <BoardGameStatsByMonth v-else />
  </div>
</template>

<script>
import BoardGameStatsByMonth from '../components/BoardGameStatsByMonth.vue'
import BoardGameStatsByDate from '../components/BoardGameStatsByDate.vue'

export default {
  props: {
    dateCode: {
      type: String,
      default: null
    }
  },
  components: { BoardGameStatsByDate, BoardGameStatsByMonth }
}
</script>