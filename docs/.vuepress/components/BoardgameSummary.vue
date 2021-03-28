<template>
<div class="boardgame-list">
  <p v-if="message">{{ message }}</p>
  <div v-if="game.name">
    <h2>{{game.name}}</h2>
    <stat-value label="Board Game Geek Name">{{ game.boardGameGeekName }}</stat-value>
    <stat-value label="Board Game API ID">{{ game.boardGameApiId }}</stat-value>
    <hr />

    <h3>Play Summary</h3>
    <div class="play summary">
      <stat-value label="Total Games Played">{{ game.totalGamesPlayed }}</stat-value>
      <p>
        <game-stat-box v-for="(playRecord, index) in game.playRecords" :game="playRecord" :name="game.name" :key="`gameStat_${playRecord.date}_${index}`" />
      </p>
      <game-stat-key />
    </div>

    <div v-if="game.coOpGamesPlayedCount > 0">
      <h3>Co-op Stats</h3>
      <stat-value label="Co-op Games Played Count">{{ game.coOpGamesPlayedCount }}</stat-value>
      <stat-value label="Co-op Games Played Percentage">{{ fmp(game.coOpGamesPlayedPercentage) }}</stat-value>
      <hr />
      <stat-value label="Co-op Game Wins">{{ game.coOpGameWins }}</stat-value>
      <stat-value label="Co-op Game Loses">{{ game.coOpGameLoses }}</stat-value>
      <hr />
      <stat-value label="Co-op Win Rate">{{ fmp(game.coOpWinRate) }}</stat-value>
      <stat-value label="Co-op Loss Rate">{{ fmp(game.coOpLossRate) }}</stat-value>
    </div>
    <div v-else>
      <h3>Vs Stats</h3>
      <stat-value :label="`Winnable games total`">{{ game.winnableGamesTotal }}</stat-value>
      <stat-value :label="`Most won games of ${game.name}`">{{ game.mostWonGames }}</stat-value>
      <hr />
      <stat-value label="Number of games won by Hannah">{{ game.winCountHannah }}</stat-value>
      <stat-value label="Number of games won by John">{{ game.winCountJohn }}</stat-value>
      <stat-value label="Number of games won by Others">{{ game.winCountOther }}</stat-value>
      <stat-value label="Number of games drawn">{{ game.winCountDraw }}</stat-value>
      <hr />
      <stat-value label="Win Percentage for Hannah">{{ fmp(game.winPercentageHannah) }}</stat-value>
      <stat-value label="Win Percentage for John">{{ fmp(game.winPercentageJohn) }}</stat-value>
      <stat-value label="Win Percentage for Other">{{ fmp(game.winPercentageOther) }}</stat-value>
      <stat-value label="Draw Percentage">{{ fmp(game.winPercentageDraw) }}</stat-value>
    </div>
    <h3>Play Records</h3>
    <div class="play records">
      <p v-for="(playRecord, index) in game.playRecords" :key="`playRecord_${playRecord.date}_${index}`">
        <stat-value :label="playRecord.date">
          <game-stat-box :game="playRecord" :name="game.name" />
          <span>{{ playRecord.winner || playRecord.coOpOutcome }}</span>
        </stat-value>
        <stat-value label="Game Family" v-if="playRecord.gameFamily">{{ playRecord.gameFamily }}</stat-value>
        <stat-value label="Notes" v-if="playRecord.notes">{{ playRecord.notes }}</stat-value>
        <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
      </p>
    </div>
  </div>
  <div v-else-if="gameId">
    <!--Loading data for {{ gameId }}-->
  </div>
  <div v-else>
    <p>No Boardgame ID set - <a href="./">back to index</a>?</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  name: 'BoardgameSummary',
  props: ['gameId'],
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      game: {}
    }
  },
  async beforeMount() {
    this.$data.game = await loadBoardgame(this.gameId)
    this.$data.message = false
  },
  methods: {
    fmp(number) {
      const maxed = Math.min(number, 1.0)
      return (maxed * 100).toFixed(0) + '%'
    }
  }
}

async function loadBoardgame(gameId) {
  let game
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/by/${gameId}`)
    game = response.data.game
  } catch (error) {
    console.log('Load Boardgame:', error);
  }
  return game
}

</script>
