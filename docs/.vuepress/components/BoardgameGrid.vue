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
      challengeGrid: {}
    }
  },
  async beforeMount() {
    this.$data.challengeGrid = await loadBoardgameGrid(this.dateCode)
    this.$data.message = false
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
