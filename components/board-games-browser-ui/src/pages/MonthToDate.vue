<template>
  <div class="by-month-to-date">
    <h1>Stats by Month to Date</h1>
    <p>Statistics for games played this month up to and including the current date.</p>

    <BoardGameStatsViewer datasourceUrl="https://boardgames-api.calisaurus.net/api/boardgame/stats/byMonth/toDate" />
  </div>
</template>

<script>
import BoardGameStatsViewer from '../components/BoardGameStatsViewer.vue';

export default {
  components: { BoardGameStatsViewer }
}
</script>