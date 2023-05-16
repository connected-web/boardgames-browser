<template>
  <div class="by-year-to-date">
    <h1>Stats by Year to Date</h1>
    <p>Statistics for games played this year up to and including the current date.</p>
    <BoardGameStatsViewer datasourceUrl="https://boardgames-api.calisaurus.net/api/boardgame/stats/byYear/toDate" />
  </div>
</template>

<script>
import BoardGameStatsViewer from '../components/BoardGameStatsViewer.vue';

export default {
  components: { BoardGameStatsViewer }
}
</script>