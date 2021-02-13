<template>
<div class="boardgame-list">
  <p v-if="message">{{message}}</p>
  <ul>
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
      games: []
    }
  },
  async beforeMount() { 
    this.$data.games = await loadBoardgameList(this)
    this.$data.message = `${this.$data.games.length} games in list:`
  },
  methods: {
    boardgameLink(game) {
      return `/boardgames-browser/game/?game=${game.boardGameApiId}`
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
</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>