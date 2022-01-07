<template>
<div class="boardgame-list">
  <p v-if="message">{{message}}</p>
  <ul>
    <li v-for="game in games" :key="`game_${game.boardGameApiId}`"><a :href="boardgameLink(game)">{{ game.name }}</a></li>
  </ul>
</div>
</template>

<script>
import modelCache from './src/modelCache'
import sharedModel from './src/sharedModel'

const { boardgamesApiUrl } = sharedModel.state

export default {
  data() {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      games: []
    }
  },
  async beforeMount() { 
    const games = await loadBoardGameList(this)
    this.games = games
    this.message = `${this.games.length} games in list:`
  },
  methods: {
    boardgameLink(game) {
      return `/boardgames-browser/browser/?game=${game.boardGameApiId}`
    }
  }
}

async function loadBoardGameList() {
  let games
  try {
    const data = await modelCache.get(`${boardgamesApiUrl}/api/boardgame/list`)
    games = data?.games || [] 
  } catch (error) {
    console.log('Load Board Game List:', error);
  }
  return games.sort((a, b) => a.name.localeCompare(b.name))
}
</script>

<style scoped>
.boardgame-list {
  border-top: 2px solid #EEE;
}
</style>