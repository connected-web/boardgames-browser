<template>
  <div>
    <code style="display: none;">{{ datasourceUrl }}</code>
    <div v-if="stats">
      <p>Board game stats for <b>{{ stats.totalGamesPlayed }}</b>
        games played by <i>Hannah and John</i> over <b>{{ stats.daysInSequence }}</b> days
        between <b>{{ stats.sequenceStartDate }}</b>
        and <b>{{ stats.sequenceEndDate }}</b>.</p>

      <div class="stats group">
        <h3>Who won the most games in this period?</h3>
        <p><b>{{ stats.mostWonGames }}</b> won the most games!</p>

        <stat-value label="Wins by Hannah">{{ stats.winCountHannah }}</stat-value>
        <stat-value label="Wins by John">{{ stats.winCountJohn }}</stat-value>
        <stat-value label="Wins by Other players">{{ stats.winCountOther }}</stat-value>
        <stat-value label="Drawn games">{{ stats.winCountDraw }}</stat-value>

        <div class="percentage bar">
          <GameStatBox :game="{ coOp: 'No', winner: 'Hannah', name: `Hannah's total win percentage` }"
            :style="`width: ${pc(stats.winPercentageHannah)};`"><span>Hannah<br />{{ pc(stats.winPercentageHannah) }}</span></GameStatBox>
          <GameStatBox :game="{ coOp: 'No', winner: 'John', name: `John's total win percentage` }"
            :style="`width: ${pc(stats.winPercentageJohn)};`"><span>John<br />{{ pc(stats.winPercentageJohn) }}</span></GameStatBox>
          <GameStatBox :game="{ coOp: 'No', winner: 'Other', name: 'Other winners percentage' }"
            :style="`width: ${pc(stats.winPercentageOther)};`" class="slim"><span>Other</span></GameStatBox>
          <GameStatBox :game="{ coOp: 'No', winner: 'Draw', name: 'Draw percentage' }"
            :style="`width: ${pc(stats.winPercentageDraw)};`" class="slim"><span>Draw</span></GameStatBox>
        </div>
      </div>

      <div class="stats group">
        <h3>Hannah's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesHannah" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div class="stats group">
        <h3>John's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesJohn" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div class="stats group">
        <h3>Most played games</h3>
        <ul>
          <li v-for="item in stats.mostPlayedGames" :key="`mpg-${item.name}`">
            <stat-value :label="`${item.name}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div class="stats group">
        <h3>Co-op Stats</h3>
        <stat-value label="Co-op Games Played">{{ stats.coOpGamesPlayedCount }}</stat-value>
        <stat-value label="Co-op Games Percentage">{{ pc(stats.coOpGamesPlayedPercentage) }}</stat-value>
        <stat-value label="Co-op Games Won">{{ stats.coOpGameWins }}</stat-value>
        <stat-value label="Co-op Games Lost">{{ stats.coOpGameLoses }}</stat-value>

        <div class="percentage bar">
          <GameStatBox :game="{ coOp: 'Yes', coOpOutcome: 'Win', name: `Co-operative win percentage` }"
            :style="`width: ${pc(stats.coOpWinRate)};`"><span>Win<br />{{ pc(stats.coOpWinRate) }}</span></GameStatBox>
          <GameStatBox :game="{ coOp: 'Yes', coOpOutcome: 'Loss', name: `Co-operative loss percentage` }"
            :style="`width: ${pc(stats.coOpLossRate)};`"><span>Loss<br />{{ pc(stats.coOpLossRate) }}</span></GameStatBox>
        </div>
        
      </div>

      <div class="stats group">
        <h3>Most games played in a day</h3>
        <p v-if="stats.mostGamesPlayedInADay && stats.mostGamesPlayedInADay.length > 1">There were multiple days that tied for most games played in a day.</p>
        <Collapsed title="List of games">
          <div v-for="day in stats.mostGamesPlayedInADay" :key="day.date">
            <h4>{{ day.date }}</h4>
            <ul>
              <li v-for="(game, idx) in day.games" :key="`mpiad-${game}-${idx}`">{{ game }}</li>
            </ul>
          </div>
        </Collapsed>
      </div>

      <div class="stats group">
        <h3>Unique games played</h3>
          <stat-value label="Unique games">{{ stats.uniqueGamesPlayedCount }}</stat-value>
          <stat-value label="Unique games percent">{{ pc(stats.uniqueGamesPlayedPercentage) }}</stat-value>
        <Collapsed title="List of games">
          <PaginatedItems :items="stats.uniqueGamesPlayed" :showFilter="false" itemTypePlural="games">
            <template v-slot="{ paginatedItems }">
              <ul>
                <li v-for="game in paginatedItems" :key="`u-${game}`">{{ game }}</li>
              </ul>
            </template>
          </PaginatedItems>
        </Collapsed>
      </div>

      <div class="stats group">
        <h3>Sequence</h3>
        <stat-value label="Sequence start date">{{ stats.sequenceStartDate }}</stat-value>
        <stat-value label="Sequence end date">{{ stats.sequenceEndDate }}</stat-value>
        <stat-value label="Days in sequence">{{ stats.daysInSequence }}</stat-value>
        <stat-value label="Days with unplayed games">{{ stats.daysWithUnplayedGames }}</stat-value>
      </div>

      <div class="stats group">
        <h3>Games played</h3>
        <stat-value label="Total games played">{{ stats.totalGamesPlayed }}</stat-value>
        <stat-value label="Average games played per day">{{ stats.averageGamesPlayedPerDay }}</stat-value>

        <Collapsed title="List of play records">
          <PaginatedItems :items="sortedPlayRecords" :pageSize="10" itemTypePlural="play records">
            <template v-slot="{ paginatedItems }">
              <div v-for="(playRecord, index) in paginatedItems" :key="`playRecord_${playRecord.date}_${playRecord.name}_${index}`">
                <h4>{{ playRecord.name }}</h4>
                <stat-value label="Date" v-if="playRecord.date">{{ playRecord.date }}</stat-value>
                <stat-value label="Outcome">
                  <span>{{ (playRecord.coOp + '').toLowerCase() === 'yes' ? 'Co-op' : 'Won by' }} {{ playRecord.winner || playRecord.coOpOutcome || 'Unknown' }}</span>
                  <game-stat-box :game="playRecord" :name="playRecord.name" />
                </stat-value>
                <stat-value label="Notes" v-if="playRecord.notes">{{ playRecord.notes }}</stat-value>
                <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
              </div>
            </template>
          </PaginatedItems>
        </Collapsed>
      </div>

      <div class="stats group">
        <h3>Games played per day</h3>
        <DayGrid :items="stats.gamesPlayedPerDay" :sequenceStartDate="new Date(stats.sequenceStartDate)" @selected="handleSelectedDay" />
      </div>

      <div v-if="selectedDay" class="stats group">
        <h3>Selected Day</h3>
        <pre><code>{{ selectedDay }}</code></pre>
      </div>

      <pre style="display: none"><code>{{ stats }}</code></pre>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import modelCache from './src/modelCache'

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
      error: '',
      selectedDay: null
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
    },
    handleSelectedDay(day) {
      this.selectedDay = day
    }
  },
  async mounted() {
    const { datasourceUrl } = this
    try {
      const data = await modelCache.get(datasourceUrl)
      this.response = { data }
    } catch (ex) {
      this.response = ex.response
      this.error = `Unable to load ${datasourceUrl} : ${ex.message}`
    }
  }
}
</script>

<style>
.percentage.bar {
  display: flex;
  height: 100px;
}
.percentage.bar > .game.stat.box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
}
.percentage.bar > .game.stat.box {
  padding: 0;
}
.percentage.bar > .game.stat.box.slim > span {
  display: inline-block;
  transform: rotate(90deg);
}
</style>