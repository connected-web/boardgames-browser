<template>
<div class="boardgame-list">
  <p v-if="message">{{message}}</p>
  <div v-if="gameId">
    <h2>{{game.name}}</h2>
    <div class="boardgame"><pre><code>{{ JSON.stringify(game, null, 2) }}</code></pre></div>
  </div>
  <ul v-else>
    <li v-for="game in games"><a :href="boardgameLink(game)">{{ game.name }}</a></li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      games: [],
      game: {},
      gameId: false,
    }
  },
  async beforeMount() { 
    const params = getParamsFromUrl(document.location)
    const { game } = params

    if (game) {
      this.$data.gameId = game
      this.$data.game = await loadBoardgame(game)
      this.$data.message = false
    }
    else {
      this.$data.games = await loadBoardgameList(this)
      this.$data.message = `${this.$data.games.length} games in list:`
    }
  },
  methods: {
    boardgameLink(game) {
      return `?game=${game.boardGameApiId}`
    }
  }
}

async function loadBoardgameList() {
  let games
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/list`)
    games = response.data.games
  } catch (error) {
    console.log('Load Boardgame List:', error);
  }
  return games.sort((a, b) => a.name.localeCompare(b.name))
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

function getParamsFromUrl(url) {
  const decodedUrl = decodeURI(url)
  if (typeof decodedUrl === 'string') {
    let paramStr = (decodedUrl.split('?')[1] || '').split('#')[0]
    let pairs = paramStr.split('&').map(kvp => kvp.split('='))
    let params = pairs.reduce((acc, [key, value]) => {
      if (key) {
        acc[key] = value
      }
      return acc
    }, {})
    return params
  }
}
</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>