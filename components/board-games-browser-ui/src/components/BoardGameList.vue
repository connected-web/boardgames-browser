<template>
<div class="boardgame-list">
  <p v-if="message">{{message}}</p>
  <PaginatedItems :items="games">
    <template v-slot="{ paginatedItems }">
      <ul>
        <li v-for="game in paginatedItems" :key="`game_${game.boardGameApiId}`">
          <router-link :to="boardgameLink(game)">{{ game.name }}</router-link>
        </li>
      </ul>
    </template>
  </PaginatedItems>
</div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'

import PaginatedItems from './PaginatedItems.vue'

const { boardgamesApiUrl } = sharedModel.state

export default {
  components: { PaginatedItems },
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
      return `/games/by-name/${game.boardGameApiId}`
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