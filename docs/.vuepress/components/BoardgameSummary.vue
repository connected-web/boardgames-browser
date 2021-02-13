<template>
<div class="boardgame-list">
  <p v-if="message">{{ message }}</p>
  <div v-if="gameId">
    <h2>{{game.name}}</h2>
    <div class="boardgame"><pre><code>{{ JSON.stringify(game, null, 2) }}</code></pre></div>
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
