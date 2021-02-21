<template>
<div class="boardgame-list">
  <p v-if="message">{{ message }}</p>
  <div v-if="$props.dateCode">
    <h2>{{challengeGrid.title}}</h2>
    <div class="challenge details">
      <p>The <b>{{challengeGrid.dateCode}}</b> challenge covers games played on or between
        <b>{{challengeGrid.challenge.startDate}}</b> and <b>{{challengeGrid.challenge.endDate}}</b>.
      </p>
      <p>There are <b>{{challengeGrid.challenge.gameFamiliesCount}}</b> families of games that need to be played
        <b>{{challengeGrid.challenge.gamesToPlayCountPerFamily}}</b> times each to complete the challenge!
      </p>
      <p>So far <b>{{ challengeGrid.overview.gamesPlayedCount }}</b> games have been played, 
        or <b>{{ fmp(challengeGrid.overview.gamesPlayedPercentage) }}</b>
        out of a total of <b>{{ challengeGrid.overview.totalGamesToPlayCount }}</b>.</p>
      </p>
    </div>
    <div class="challenge grid">
      <div class="challenge row" v-for="entry in challengeGrid.grid">
        <div class="game family name">{{ entry.gameFamily }}</div>
        <div class="game family progress">
          <div class="play count label">P {{ entry.gamesPlayedCount }}</div>
          <div class="progress bar" style="width: 100%;">
            <div class="bar coop win" :style="`width: ${fmp(countWinner(entry, 'w'))};`"></div>
            <div class="bar coop lose" :style="`width: ${fmp(countWinner(entry, 'l'))};`"></div>
            <div class="bar vs other" :style="`width: ${fmp(countWinner(entry, 'o'))};`"></div>
            <div class="bar vs draw" :style="`width: ${fmp(countWinner(entry, 'd'))};`"></div>
            <div class="bar vs john" :style="`width: ${fmp(countWinner(entry, 'j'))};`"></div>
            <div class="bar vs hannah" :style="`width: ${fmp(countWinner(entry, 'h'))};`"></div>
          </div>
        </div>
        <div class="game family play stats">
          <GameStatBox v-for="game in limit(entry.gameStats, challengeGrid.challenge.gamesToPlayCountPerFamily)" :game="game" />
        </div>
      </div>
      <div class="grid key">
        <b>Key:</b>
        <div class="horizontal items">
          <GameStatKeyBox symbol="j" label="John" />
          <GameStatKeyBox symbol="h" label="Hannah" />
          <GameStatKeyBox symbol="o" label="Other" />
          <GameStatKeyBox symbol="d" label="Draw" />
          <GameStatKeyBox symbol="w" label="Co-op: Win" />
          <GameStatKeyBox symbol="l" label="Co-op: Lose" />
        </div>
      </div>
    </div>
    <div class="challenge details">
      <p>The available data covers <b>{{ challengeGrid.sequence.daysInSequenceCount }}</b> days between
        <b>{{ challengeGrid.sequence.earliestDate }}</b> and <b>{{ challengeGrid.sequence.latestDate }}</b>.</p>
     </div>
  </div>
  <div v-else>
    <p>No date code set - <a href="./">back to grids</a>?</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  name: 'BoardgameGrid',
  props: ['dateCode'],
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      challengeGrid: {
        challenge: {},
        overview: {},
        sequence: {}
      }
    }
  },
  async beforeMount() {
    this.$data.challengeGrid = await loadBoardgameGrid(this.dateCode)
    this.$data.message = false
  },
  computed: {
    gamesToPlayCountPerFamily() {
      try {
        return this.$data.challengeGrid.challenge.gamesToPlayCountPerFamily
      } catch (ex) {
        return 1
      }
    }
  },
  methods: {
    limit(list, count) {
      return list.slice(0, count * 2)
    },
    fmp(number) {
      const maxed = Math.min(number, 1.0)
      return (maxed * 100).toFixed(0) + '%'
    },
    countWinner(entry, firstChar) {
      const { gameStats } = entry
      const winners = gameStats
        .map(stat => stat.winner || stat.coOpOutcome || '?')
        .filter(w => w.charAt(0).toLowerCase() === firstChar)
      return Math.min(1.0, winners.length / this.gamesToPlayCountPerFamily)
    }
  }
}

async function loadBoardgameGrid(dateCode) {
  let challengeGrid = {}
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/grids/byYear/${dateCode}`)
    challengeGrid = response.data
  } catch (error) {
    challengeGrid.title = `Unable to load challenge grid: ${error.message}`
    console.log('Load Boardgame Grid:', error);
  }
  return challengeGrid
}
</script>

<style scoped>
.challenge.row > * {
  display: inline-block;
  background: #eee;
}
.game.family.name {
  margin: 2px;
  padding: 2px;
  font-size: 0.8em;
  width: 200px;
  font-weight: bold;
}
.game.family.progress {
  position: relative;
  margin: 2px;
  padding: 2px;
  font-size: 0.8em;
  width: 80px;
  background: #ccc;
}
.progress.bar {
  display: inline-flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
}
.progress.bar > .bar {
  display: inline-block;
  position: relative;
  height: 100%;
}
.play.count.label {
  position: relative;
  z-index: 2;
  font-weight: bold;
}
.game.family.play.stats {
  display: inline-flex;
}
.horizontal.items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.horizontal.items > * {
  margin: 5px;
}
@media (max-width: 959px) {
  .game.family.play.stats {
    display: none;
  }
  .challenge.row {
    display: flex;
  }
  .challenge.row > .game.family {
    flex: 1 2;
  }
}
.grid.key {
  display: block;
  background: #F5F5F5;
  margin: 2px;
  padding: 4px;
}
.grid.key > b {
  font-size: 0.8em;
}
.coop.won, .coop.win {
  color: black;
  background-color: #93c47d;
}
.coop.lost, .coop.lose {
  color: white;
  background-color: #434343;
}
.vs.other {
  color: #333;
  background-color: #dca;
}
.vs.draw {
  color: #333;
  background-color: #ffe599;
}
.vs.john {
  color: black;
  background-color: #dd7e6b;
}
.vs.hannah {
  color: black;
  background-color: #8e7cc3;
}
</style>