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
    </div>
    <div class="challenge grid">
      <div class="challenge row" v-for="entry in challengeGrid.grid">
        <div class="game family name">{{ entry.gameFamily }}</div>
        <div class="game family progress">
          <div class="play count label">P {{ entry.gamesPlayedCount }}</div>
          <div class="progress bar" :style="`width: ${fmp(entry.gamesPlayedPercentage)};`"></div>
        </div>
        <div class="game family play stats">
          <GameStatBox v-for="game in limit(entry.gameStats, challengeGrid.challenge.gamesToPlayCountPerFamily)" :game="game" />
        </div>
      </div>
    </div>
    <div class="boardgame"><pre><code>{{ JSON.stringify(challengeGrid, null, 2) }}</code></pre></div>
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
        challenge: {}
      }
    }
  },
  async beforeMount() {
    this.$data.challengeGrid = await loadBoardgameGrid(this.dateCode)
    this.$data.message = false
  },
  methods: {
    limit(list, count) {
      return list.slice(0, count * 2)
    },
    fmp(number) {
      const maxed = Math.min(number, 1.0)
      return (maxed * 100).toFixed(0) + '%'
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
  position: absolute;
  top: 0;
  left: 0;
  background: #999;
  height: 100%;
  z-index: 1;
}
.play.count.label {
  position: relative;
  z-index: 2;
}
.game.family.play.stats {
  display: inline-flex;
}
</style>