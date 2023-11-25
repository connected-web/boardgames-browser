<template>
  <div class="by-all-time">
    <h1>Stats by All Time</h1>
    <p>Statistics for all games played on record.</p>
    <BoardGameStatsViewer datasourceUrl="https://boardgames-api.calisaurus.net/api/boardgame/stats/byAllTime" />
  </div>
</template>

<script>
import BoardGameStatsViewer from '../components/BoardGameStatsViewer.vue';

export default {
  components: { BoardGameStatsViewer }
}
</script>