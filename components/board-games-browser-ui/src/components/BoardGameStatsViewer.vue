<template>
  <div>
    <code style="display: none;">{{ datasourceUrl }}</code>
    <p v-if="loading">
      <LoadingSpinner>Loading stats...</LoadingSpinner>
    </p>
    <div v-if="stats">
      <h3>Overview</h3>
      <p>Board game stats played by <i>Hannah and John</i> over <b>{{ stats.daysInSequence }}</b> days
        between <b>{{ stats.sequenceStartDate }}</b>
        and <b>{{ stats.sequenceEndDate }}</b>.</p>

      <div class="stats group">
        <stat-value label="Total Games Played">{{ stats.totalGamesPlayed }}</stat-value>
        <stat-value label="Unique games">{{ stats.uniqueGamesPlayedCount }}</stat-value>
        <stat-value label="Average games played per day">{{ stats.averageGamesPlayedPerDay }}</stat-value>
      </div>

      <div v-if="stats.mostPlayedGames?.length > 0" class="stats group">
        <h3>Most played games</h3>
        <ul>
          <li v-for="item in stats.mostPlayedGames" :key="`mpg-${item.name}`">
            <stat-value :label="`${item.name}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div v-if="stats.mostWonGamesHannah?.length > 0" class="stats group">
        <h3>Hannah's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesHannah" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div v-if="stats.mostWonGamesJohn?.length > 0" class="stats group">
        <h3>John's most won games</h3>
        <ul>
          <li v-for="item in stats.mostWonGamesJohn" :key="`mpg-${item.game}`">
            <stat-value :label="`${item.game}`">{{ item.plays }} {{ item.plays > 1 ? 'plays' : 'play' }}</stat-value>
          </li>
        </ul>
      </div>

      <div v-if="stats.winnableGamesTotal > 0" class="stats group">
        <h3>Co-op vs Competitive</h3>

        <div class="percentage bar">
          <GameStatBox :game="{ coOp: 'No', winner: 'Other', name: `Competitive Games Played` }"
            :style="`width: ${pc(stats.winnableGamesTotal / stats.totalGamesPlayed)};`">
            <span>Competitive<br />{{ pc(stats.winnableGamesTotal / stats.totalGamesPlayed) }}<br />
              <b>{{ stats.winnableGamesTotal }} games</b></span>
          </GameStatBox>
          <GameStatBox :game="{ coOp: 'Yes', coOpOutcome: 'Win', name: `Co-operative Games Played` }"
            :style="`width: ${pc((stats.totalGamesPlayed - stats.winnableGamesTotal) / stats.totalGamesPlayed)};`">
            <span>Co-operative<br />{{ pc((stats.totalGamesPlayed - stats.winnableGamesTotal) / stats.totalGamesPlayed) }}<br />
              <b>{{ stats.totalGamesPlayed - stats.winnableGamesTotal }} games</b></span>
          </GameStatBox>
        </div>

        <h4>Competitive breakdown</h4>
        <p><b>{{ stats.mostWonGames }}</b> won the most games!</p>
        <div class="percentage bar">
          <GameStatBox :game="{ coOp: 'No', winner: 'Hannah', name: `Hannah's total win percentage` }"
            :style="`width: ${pc(stats.winPercentageHannah)};`"><span>Hannah<br />{{ pc(stats.winPercentageHannah) }}<br />
              <b>{{ stats.winCountHannah }} games</b></span></GameStatBox>
          <GameStatBox :game="{ coOp: 'No', winner: 'John', name: `John's total win percentage` }"
            :style="`width: ${pc(stats.winPercentageJohn)};`"><span>John<br />{{ pc(stats.winPercentageJohn) }}<br />
              <b>{{ stats.winCountJohn }} games</b></span></GameStatBox>
          <GameStatBox :game="{ coOp: 'No', winner: 'Other', name: 'Other winners percentage' }"
            :style="`width: ${pc(stats.winPercentageOther)};`" class="slim"><span>Other <b>({{ stats.winCountOther }})</b></span></GameStatBox>
          <GameStatBox v-if="stats.winCountDraw > 0" :game="{ coOp: 'No', winner: 'Draw', name: 'Draw percentage' }"
            :style="`width: ${pc(stats.winPercentageDraw)};`" class="slim"><span>Draw <b>({{ stats.winCountDraw }})</b></span></GameStatBox>
        </div>

        <h4>Cooperative breakdown</h4>
        <div class="percentage bar">
          <GameStatBox :game="{ coOp: 'Yes', coOpOutcome: 'Win', name: `Co-operative win percentage` }"
            :style="`width: ${pc(stats.coOpWinRate)};`"><span>Win<br />{{ pc(stats.coOpWinRate) }}<br />
            <b>{{ stats.coOpGameWins }} games</b></span></GameStatBox>
          <GameStatBox :game="{ coOp: 'Yes', coOpOutcome: 'Loss', name: `Co-operative loss percentage` }"
            :style="`width: ${pc(stats.coOpLossRate)};`"><span>Loss<br />{{ pc(stats.coOpLossRate) }}<br />
            <b>{{ stats.coOpGameLoses }} games</b></span></GameStatBox>
        </div>
        
      </div>

      <div  v-if="stats.mostGamesPlayedInADay?.length > 0"  class="stats group">
        <h3>Most games played in a day</h3>
        <p v-if="stats.mostGamesPlayedInADay?.length > 1">There were multiple days that tied for most games played in a day.</p>
        <p v-else-if="stats.mostGamesPlayedInADay?.length > 0">A total of <b>{{ stats.mostGamesPlayedInADay[0]?.games?.length }} games</b> were played on <b>{{ stats.mostGamesPlayedInADay[0]?.date }}</b>.</p>
        <div v-for="day in stats.mostGamesPlayedInADay" :key="day.date">
          <h4>{{ day.date }}</h4>
          <ul>
            <li v-for="(game, idx) in day.games" :key="`mpiad-${game}-${idx}`">{{ game }}</li>
          </ul>
        </div>
      </div>

      <div class="stats group">
        <h3>Unique games played</h3>
          <stat-value label="Unique games">{{ stats.uniqueGamesPlayedCount }}</stat-value>
          <stat-value label="Unique games percent">{{ pc(stats.uniqueGamesPlayedPercentage) }}</stat-value>
        <Collapsed title="List of unique games">
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
        <h3>Play Records</h3>

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
        <h3>Calendar</h3>
        <DayGrid :items="stats.gamesPlayedPerDay" :sequenceStartDate="new Date(stats.sequenceStartDate)" @selected="handleSelectedDay" />
      </div>

      <div v-if="selectedDay" class="stats group">
        <h3>Selected Day</h3>
        
        <stat-value label="Date">{{ selectedDay.date }}</stat-value>
        <stat-value label="Day of Week">{{ selectedDay.dayOfWeek }}</stat-value>
        <stat-value label="Weekend">{{ selectedDay.weekend ? 'Yes' : 'No' }}</stat-value>
        <stat-value label="Games Played">{{ selectedDay.count }}</stat-value>

        <div v-for="(playRecord, index) in selectedDayPlayRecords" :key="`playRecord_${playRecord.date}_${playRecord.name}_${index}`">
          <h4>{{ playRecord.name }}</h4>
          <stat-value label="Date" v-if="playRecord.date">{{ playRecord.date }}</stat-value>
          <stat-value label="Outcome">
            <span>{{ (playRecord.coOp + '').toLowerCase() === 'yes' ? 'Co-op' : 'Won by' }} {{ playRecord.winner || playRecord.coOpOutcome || 'Unknown' }}</span>
            <game-stat-box :game="playRecord" :name="playRecord.name" />
          </stat-value>
          <stat-value label="Notes" v-if="playRecord.notes">{{ playRecord.notes }}</stat-value>
          <!-- <pre><code>{{ JSON.stringify(playRecord, null, 2) }}</code></pre> -->
        </div>
      </div>

      <pre style="display: none"><code>{{ stats }}</code></pre>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import modelCache from '../helpers/modelCache'

import dayjs from 'dayjs'

import PaginatedItems from './PaginatedItems.vue'
import Collapsed from './Collapsed.vue'
import GameStatBox from './GameStatBox.vue'
import StatValue from './StatValue.vue'
import DayGrid from './DayGrid.vue'

import LoadingSpinner from './LoadingSpinner.vue'

export default {
  components: { PaginatedItems, Collapsed, GameStatBox, StatValue, DayGrid, LoadingSpinner },
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
      selectedDay: null,
      loading: false
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
    },
    selectedDayPlayRecords() {
      const { selectedDay, sortedPlayRecords } = this
      console.log('Selected day', { selectedDay, sortedPlayRecords })
      if (selectedDay?.startDate) {
        return sortedPlayRecords.filter(item => dayjs(item.date).isSame(selectedDay.startDate, 'day'))
      }
      return []
    }
  },
  methods: {
    pc(val) {
      return (val * 100).toFixed(1) + '%'
    },
    handleSelectedDay(day) {
      this.selectedDay = day
    },
    async loadStats() {
      const { datasourceUrl } = this
      this.loading = true
      try {
        const data = await modelCache.get(datasourceUrl)
        this.response = { data }
      } catch (ex) {
        this.response = ex.response
        this.error = `Unable to load ${datasourceUrl} : ${ex.message}`
      }
      this.loading = false
    }
  },
  async mounted() {
    this.loadStats()
  },
  watch: {
    datasourceUrl(newVal) {
      this.loadStats()
    }
  }
}
</script>

<style>
.percentage.bar {
  display: flex;
  height: 60px;
  border-radius: 5px;
  overflow: hidden;
  outline: 2px solid #666;
  margin: 0.5em 0;
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
  text-wrap: nowrap;
}

ul > li {
  margin: 0.5em 0 0.5em 1em;
  list-style-type: disc;
}
</style>