<template>
  <div :class="`game stat box ${gameStat(game).className}`"  :title="gameStat(game).title">{{ gameStat(game).code }}</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  name: 'GameStatBox',
  props: ['game'],
  methods: {
    gameStat(game) {
      return game.coOp.toLowerCase() === 'yes' ? this.coopStat(game) : this.vsStat(game)
    },
    coopStat(game) {
      const winLoss = game.coOpOutcome.charAt(0).toLowerCase()
      return {
        className: `coop ${game.coOpOutcome.toLowerCase()}`,
        code: winLoss,
        title: `Date: ${game.date}; Co-op Result: ${game.coOpOutcome}`
      }
    },
    vsStat(game) {
      const winner = game.winner.charAt(0).toLowerCase()
      return {
        className: `vs ${game.winner.toLowerCase()}`,
        code: winner,
        title: `Date: ${game.date}; Winner: ${game.winner}`
      }
    }
  }
}
</script>

<style scoped>
.game.stat.box {
  display: inline-block;
  width: 20px;
  text-align: center;
  margin: 2px;
  padding: 2px;
  font-size: 0.8em;
  text-transform: uppercase;
}
.coop.won {
  color: black;
  background-color: #93c47d;
}
.coop.lost {
  color: white;
  background-color: #434343;
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