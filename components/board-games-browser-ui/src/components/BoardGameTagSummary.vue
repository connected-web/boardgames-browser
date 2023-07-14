<template>
<div class="boardgame-list">
  <p><router-link to="/games/by-tag">&larr; Game Tags</router-link></p>
  <p v-if="loading">
    <LoadingSpinner>Loading game stats by tag...</LoadingSpinner>
  </p>
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
      <p class="by-year">
        <span :class="selectedYearClass('year-in-use', false)"
          v-on:click="selectYear(false)">All Records</span>
        <span v-for="year in yearsFor(summary.gamesPlayed)" :key="year"
          :class="selectedYearClass('year-in-use', year)"
          v-on:click="selectYear(year)">{{ year }}</span>
      </p>
      <p>Found {{filteredPlayRecords.length}} play records:</p>
      <p v-for="(playRecord, index) in filteredPlayRecords" :key="`playRecord_${playRecord.date}_${playRecord.name}_${index}`">
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
    <p>No Board Game Tag or Value set - <a href="./">back to index</a>?</p>
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
  props: ['tag', 'value'],
  data: function () {
    return {
      activeYear: false,
      message: `Loading data from ${boardgamesApiUrl}`,
      summary: {},
      loading: false
    }
  },
  async beforeMount() {
    this.loading = true
    this.summary = await loadBoardGameSummaryByTag(this.tag, this.value)
    this.message = false
    this.loading = false
  },
  computed: {
    filteredPlayRecords() {
      const playRecords = this.summary.gamesPlayed || []
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
    }
  }
}

async function loadBoardGameSummaryByTag(tag, value) {
  let summary
  try {
    summary = await modelCache.get(`${boardgamesApiUrl}/api/boardgame/stats/byTag/${tag}/${value}`)
  } catch (error) {
    console.error('Load Board Game Summary by Tag:', error);
  }
  return summary
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
</style>