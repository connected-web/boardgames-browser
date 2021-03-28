<template>
<div class="boardgame-list">
  <p v-if="message">{{ message }}</p>
  <div v-if="summary.name">
    <h2>{{summary.name}}</h2>
    <stat-value label="Game Family ID">{{ summary.gameFamilyId }}</stat-value>
    <stat-value label="Earliest Date">{{ summary.earliestDate }}</stat-value>
    <stat-value label="Latest Date">{{ summary.latestDate }}</stat-value>
    <hr />

    <h3>Play Summary</h3>
    <div class="play summary">
      <stat-value label="Total Games Played">{{ summary.totalGamesPlayed }}</stat-value>
      <p>
        <game-stat-box v-for="(playRecord, index) in summary.gamesPlayed" :game="playRecord" :name="summary.name" :key="`playRecord_${playRecord.date}_${index}`" />
      </p>
      <game-stat-key />
    </div>

    <div v-if="summary.coOpGamesPlayedCount > 0">
      <h3>Co-op Stats</h3>
      <stat-value label="Co-op Games Played Count">{{ summary.coOpGamesPlayedCount }}</stat-value>
      <stat-value label="Co-op Games Played Percentage">{{ fmp(summary.coOpGamesPlayedPercentage) }}</stat-value>
      <hr />
      <stat-value label="Co-op Game Wins">{{ summary.coOpGameWins }}</stat-value>
      <stat-value label="Co-op Game Loses">{{ summary.coOpGameLoses }}</stat-value>
      <hr />
      <stat-value label="Co-op Win Rate">{{ fmp(summary.coOpWinRate) }}</stat-value>
      <stat-value label="Co-op Loss Rate">{{ fmp(summary.coOpLossRate) }}</stat-value>
    </div>
    <div v-else>
      <h3>Vs Stats</h3>
      <stat-value :label="`Winnable games total`">{{ summary.winnableGamesTotal }}</stat-value>
      <stat-value :label="`Most won games of ${summary.name}`">{{ summary.mostWonGames }}</stat-value>
      <hr />
      <stat-value label="Number of games won by Hannah">{{ summary.winCountHannah }}</stat-value>
      <stat-value label="Number of games won by John">{{ summary.winCountJohn }}</stat-value>
      <stat-value label="Number of games won by Others">{{ summary.winCountOther }}</stat-value>
      <stat-value label="Number of games drawn">{{ summary.winCountDraw }}</stat-value>
      <hr />
      <stat-value label="Win Percentage for Hannah">{{ fmp(summary.winPercentageHannah) }}</stat-value>
      <stat-value label="Win Percentage for John">{{ fmp(summary.winPercentageJohn) }}</stat-value>
      <stat-value label="Win Percentage for Other">{{ fmp(summary.winPercentageOther) }}</stat-value>
      <stat-value label="Draw Percentage">{{ fmp(summary.winPercentageDraw) }}</stat-value>
    </div>
    <h3>Games Played</h3>
    <div class="play records" v-if="summary.gamesPlayed">
      <p v-for="(playRecord, index) in summary.gamesPlayed" :key="`playRecord_${playRecord.date}_${playRecord.name}_${index}`">
        <b>{{ playRecord.name }}</b>
        <stat-value label="Date" v-if="playRecord.date">{{ playRecord.date }}</stat-value>
        <stat-value label="Outcome">
          <game-stat-box :game="playRecord" :name="summary.name" />
          <span>{{ playRecord.winner || playRecord.coOpOutcome || 'Undefined' }}</span>
        </stat-value>
        <stat-value label="Notes" v-if="playRecord.notes">{{ playRecord.notes }}</stat-value>
        <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
      </p>
    </div>
  </div>
  <div v-else-if="tag">
    <!--Loading data for {{ tag }}-->
    <pre v-if="Object.keys(summary).length > 0"><code>{{ JSON.stringify(summary, null, 2) }}</code></pre>
  </div>
  <div v-else>
    <p>No Boardgame Tag or Value set - <a href="./">back to index</a>?</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  name: 'BoardgameTagSummary',
  props: ['tag', 'value'],
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      summary: {}
    }
  },
  async beforeMount() {
    this.$data.summary = await loadBoardgameSummaryByTag(this.tag, this.value)
    this.$data.message = false
  },
  methods: {
    fmp(number) {
      const maxed = Math.min(number, 1.0)
      return (maxed * 100).toFixed(0) + '%'
    }
  }
}

async function loadBoardgameSummaryByTag(tag, value) {
  let summary
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/stats/byTag/${tag}/${value}`)
    summary = response.data
  } catch (error) {
    console.log('Load Boardgame:', error);
  }
  return summary
}

</script>
