<template>
<div class="boardgame-list">
  <p>{{message}}</p>
  <ul>
    <li v-for="game in games">{{ game.name }}</li>
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
  beforeMount() {
    axios.get(`${boardgamesApiUrl}/api/boardgame/list`)
    .then(response => {
      this.$data.games = response.data.games
      this.$data.message = `${this.$data.games.length} games in list:`
    })
    .catch(error => {
        console.log(error);
    })
  }
}
</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>