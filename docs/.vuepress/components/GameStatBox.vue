<template>
  <div :class="`game stat box ${gameStat(game).className}`"  :title="gameStat(game).title">{{ gameStat(game).code }}</div>
</template>

<script>
export default {
  props: ['game', 'name'],
  methods: {
    gameStat(game) {
      const winLoss = (game.coOpOutcome || game.winner || 'x').toLowerCase()
      const vsOrCoOp = (game.coOp || 'no').toLowerCase() === 'yes' ? 'coop' : 'vs'
      const gameTypes = { coop: 'Co-op', vs: 'Vs'}
      return {
        className: [vsOrCoOp, winLoss].join(' '),
        code: winLoss.charAt(0).toLowerCase(),
        title: `Date: ${game.date}, Game: ${game.name || this.name}, Outcome: ${game.coOpOutcome || game.winner}, Game Type: ${gameTypes[vsOrCoOp]}`
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
  cursor: help;
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
.coop.other {
  color: #333;
  outline-color: #dca;
  outline: 2px solid;
  outline-offset: -2px;
}
.coop.draw {
  color: #333;
  outline-color: #ffe599;
  outline: 2px solid;
  outline-offset: -2px;
}
.coop.john {
  color: black;
  outline-color: #dd7e6b;
  outline: 2px solid;
  outline-offset: -2px;
}
.coop.hannah {
  color: black;
  outline-color: #8e7cc3;
  outline: 2px solid;
  outline-offset: -2px;
}
.x {
  outline: 2px solid;
  outline-color: #999;
  outline-offset: -2px;
}
</style>