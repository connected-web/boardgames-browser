<template>
  <div class="by-year">
    <h1>Stats by Year</h1>
    <BoardGameStatsByDate v-if="dateCode" :dateCode="dateCode" />
    <BoardGameStatsByYear v-else />
  </div>
</template>

<script>
import BoardGameStatsByDate from '../components/BoardGameStatsByDate.vue'
import BoardGameStatsByYear from '../components/BoardGameStatsByYear.vue';

export default {
  props: {
    dateCode: {
      type: String,
      default: null
    }
  },
  components: { BoardGameStatsByDate, BoardGameStatsByYear }
}
</script>