<template>
<div class="boardgame-list">
  <p><router-link to="/games/by-name">&larr; Games by Name</router-link></p>
  <p v-if="loading">
    <LoadingSpinner>Loading info on <b>{{ gameId }}</b></LoadingSpinner>
  </p>
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
      <p class="by-year">
        <span :class="selectedYearClass('year-in-use', false)"
          v-on:click="selectYear(false)">All Records</span>
        <span v-for="year in yearsFor(game.playRecords)" :key="year"
          :class="selectedYearClass('year-in-use', year)"
          v-on:click="selectYear(year)">{{ year }}</span>
      </p>
      <p>Found {{filteredPlayRecords.length}} play records:</p>
      <p v-for="(playRecord, index) in filteredPlayRecords" :key="`playRecord_${playRecord.date}_${index}`">
        <stat-value :label="playRecord.date">
          <span>{{ ucFirst(playRecord.winner || playRecord.coOpOutcome || 'undefined') }}</span>
          <game-stat-box :game="playRecord" :name="game.name" />
        </stat-value>
        <stat-value v-if="playRecord?.gameFamily" label="Game Family">{{ playRecord?.gameFamily }}</stat-value>
        <stat-value v-if="playRecord?.expansions" label="Expansions">
          <span v-for="expansion in playRecord.expansions" :key="expansion" class="badge">{{ expansion }}</span>
        </stat-value>
        <stat-value v-if="playRecord?.notes" label="Notes">{{ playRecord.notes }}</stat-value>
        <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
      </p>
    </div>
  </div>
  <div v-else-if="gameId">
    <!--Loading data for {{ gameId }}-->
  </div>
  <div v-else>
    <p>No Board Game ID set - <a href="./">back to index</a>?</p>
  </div>
</div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'

import StatValue from './StatValue.vue'
import GameStatBox from './GameStatBox.vue'
import GameStatKey from './GameStatKey.vue'
import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesApiUrl } = sharedModel.state

export default {
  components: { StatValue, GameStatBox, GameStatKey, LoadingSpinner },
  props: ['gameId'],
  data () {
    return {
      activeYear: false,
      game: {}
    }
  },
  async beforeMount() {
    this.loadBoardGame(this.gameId)
  },
  computed: {
    filteredPlayRecords() {
      const playRecords = this.game.playRecords || []
      const sortedPlayRecords = playRecords.sort((a, b) => {
        const da = Date.parse(a.date)
        const db = Date.parse(b.date)
        return db - da
      })
      if (this.activeYear) {
        return sortedPlayRecords.filter(r => r.date.substring(0, 4) === this.activeYear)
      }
      return sortedPlayRecords
    }
  },
  methods: {
    ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    fmp(number) {
      const maxed = Math.min(number, 1.0)
      return (maxed * 100).toFixed(0) + '%'
    },
    yearsFor(playRecords) {
      return [...new Set(playRecords.map(r => r.date.substring(0, 4)))]
    },
    selectedYearClass(className, year) {
      const selected = year === this.activeYear ? 'selected' : false
      return [className, selected].filter(n => n).join(' ')
    },
    selectYear(year) {
      this.activeYear = year
    },
    async loadBoardGame(gameId) {
      this.loading = true
      const data = await modelCache.get(`${boardgamesApiUrl}/api/boardgame/by/${gameId}`)
      this.loading = false
      this.game = data?.game
    }
  },
  watch: {
    gameId(newVal) {
      this.loadBoardGame(newVal)
    }
  }
}

</script>

<style scoped>
.by-year > .year-in-use {
  margin-right: 1em;
  padding: 5px 10px;
  background: #fbfbfb;
  border-bottom: 3px solid #aaa;
  cursor: pointer;
}
.by-year > .year-in-use:hover {
  background: #eee;
}
.by-year > .year-in-use:active {
  background: rgb(164, 223, 203);
}
.by-year > .year-in-use.selected {
  border-bottom: 3px solid rgb(164, 223, 203);
}
.badge {
  display: inline-block;
  padding: 0.25em 0.5em;
  background: #dfdfdf;
  border-radius: 0.5em;
  font-size: 0.8em;
  font-weight: bold;
  color: #333;
}
</style>