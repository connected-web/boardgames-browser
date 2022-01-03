<template>
  <div>
    <code style="display: none;">{{ datasourceUrl }}</code>
    <div v-if="stats">
      <div class="stats group">
        <h3>Sequence</h3>
        <stat-value label="Sequence start date">{{ stats.sequenceStartDate }}</stat-value>
        <stat-value label="Sequence end date">{{ stats.sequenceEndDate }}</stat-value>
        <stat-value label="Days in sequence">{{ stats.daysInSequence }}</stat-value>
        <stat-value label="Days with unplayed games">{{ stats.daysWithUnplayedGames }}</stat-value>
      </div>
      <div class="stats group">
        <h3>Games played per day</h3>
        <stat-value v-for="(item, index) in stats.gamesPlayedPerDay" :key="`day-${index}`"
          :label="`Day ${index}`">{{ item }}</stat-value>
      </div>
      <div class="stats group">
        <h3>Games played</h3>
        <stat-value label="Total games played">{{ stats.totalGamesPlayed }}</stat-value>
        <stat-value label="Average games played per day">{{ stats.averageGamesPlayedPerDay }}</stat-value>
        <p>Found {{sortedPlayRecords.length}} play records:</p>
        <p v-for="(playRecord, index) in sortedPlayRecords" :key="`playRecord_${playRecord.date}_${playRecord.name}_${index}`">
          <b>{{ playRecord.name }}</b>
          <stat-value label="Date" v-if="playRecord.date">{{ playRecord.date }}</stat-value>
          <stat-value label="Outcome">
            <game-stat-box :game="playRecord" :name="playRecord.name" />
            <span>{{ playRecord.winner || playRecord.coOpOutcome || 'Undefined' }}</span>
          </stat-value>
          <stat-value label="Notes" v-if="playRecord.notes">{{ playRecord.notes }}</stat-value>
          <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
        </p>
      </div>
      <div class="stats group">
        <h3>Most games played in a day</h3>
        <p v-if="stats.mostGamesPlayedInADay.length > 1">There were multiple days that tied for most games played in a day.</p>
        <div v-for="day in stats.mostGamesPlayedInADay" :key="day.date">
          <h4>{{ day.date }}</h4>
          <ul>
            <li v-for="game in day.games" :key="`mp-${game}`">{{ game }}</li>
          </ul>
        </div>
      </div>
      <div class="stats group">
        <h3>Unique games played</h3>
          <stat-value label="Unique games">{{ stats.uniqueGamesPlayedCount }}</stat-value>
          <stat-value label="Unique games percent">{{ pc(stats.uniqueGamesPlayedPercentage) }}</stat-value>
        <ul>
          <li v-for="game in stats.uniqueGamesPlayed" :key="`u-${game}`">{{ game }}</li>
        </ul>
      </div>
      <div class="stats group">
        <h3>Most played games</h3>
        <ul>
          <li v-for="item in stats.mostPlayedGames" :key="`mpg-${item.name}`">
            <stat-value :label="`${item.name}`">{{ item.plays }} play {{ item.plays.length > 1 ? 's' : '' }}</stat-value>
          </li>
        </ul>
      </div>
      <div class="stats group">
        <h3>Who won the most games in this period?</h3>
        <p><b>{{ stats.mostWonGames }}</b> won the most games!</p>
      </div>
      <div class="stats group">
        <h3>Hannah's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesHannah" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} play {{ item.plays.length > 1 ? 's' : '' }}</stat-value>
          </li>
        </ul>
      </div>
      <div class="stats group">
        <h3>John's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesJohn" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} play {{ item.plays.length > 1 ? 's' : '' }}</stat-value>
          </li>
        </ul>
      </div>
      <div class="stats group">
        <h3>Co-op Stats</h3>
        <stat-value label="Co-op Games Played">{{ stats.coOpGamesPlayedCount }}</stat-value>
        <stat-value label="Co-op Games Percentage">{{ pc(stats.coOpGamesPlayedPercentage) }}</stat-value>
        <stat-value label="Co-op Games Win Rate">{{ pc(stats.coOpWinRate) }}</stat-value>
        <stat-value label="Co-op Games Loss Rate">{{ pc(stats.coOpLossRate) }}</stat-value>
        <stat-value label="Co-op Games Won">{{ stats.coOpGameWins }}</stat-value>
        <stat-value label="Co-op Games Lost">{{ stats.coOpLossRate }}</stat-value>
      </div>
      <div class="stats group">
        <h3>Win Counts</h3>
        <stat-value label="Wins by Hannah">{{ stats.winCountHannah }}</stat-value>
        <stat-value label="Wins by John">{{ stats.winCountJohn }}</stat-value>
        <stat-value label="Wins by Other players">{{ stats.winCountOther }}</stat-value>
        <stat-value label="Drawn games">{{ stats.winCountDraw }}</stat-value>
      </div>
      <div class="stats group">
        <h3>Win Percentages</h3>
        <stat-value label="Winnable games total">{{ stats.winnableGamesTotal }}</stat-value>
        <stat-value label="Win percentage Hannah">{{ pc(stats.winPercentageHannah) }}</stat-value>
        <stat-value label="Win percentage John">{{ pc(stats.winPercentageJohn) }}</stat-value>
        <stat-value label="Win percentage by Other players">{{ pc(stats.winPercentageOther) }}</stat-value>
        <stat-value label="Percentage of drawn games">{{ pc(stats.winPercentageDraw) }}</stat-value>
      </div>
      <pre style="display: none"><code>{{ stats }}</code></pre>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    datasourceUrl: {
      type: String,
      default: ''
    }
  }, 
  data() {
    return {
      response: null,
      error: ''
    }
  },
  computed: {
    stats() {
      return this.response?.data || false
    },
    sortedPlayRecords() {
      const playRecords = this.stats.gamesPlayed || []
      const sortedPlayRecords = playRecords.sort((a, b) => {
        const da = Date.parse(a.date)
        const db = Date.parse(b.date)
        return db - da
      })
      return sortedPlayRecords
    }
  },
  methods: {
    pc(val) {
      return (val * 100).toFixed(1) + '%'
    }
  },
  async mounted() {
    const { datasourceUrl } = this
    try {
      this.response = await axios.get(datasourceUrl)
    } catch (ex) {
      this.response = ex.response
      this.error = `Unable to load ${datasourceUrl} : ${ex.message}`
    }
  }
}
</script>