<template>
  <div class="game stat key">
    <div :class="`game stat box ${className}`">{{ symbol }}</div>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ['symbol', 'label'],
  computed: {
    className() {
      return ({
        'w': 'coop win',
        'l': 'coop lose',
        'o': 'vs other',
        'd': 'vs draw',
        'h': 'vs hannah',
        'j': 'vs john'
      })[this.symbol] || 'X'
    }
  }
}
</script>

<style scoped>
.game.stat.key > label {
  font-size: 0.8em;
}
.game.stat.box {
  display: inline-flex;
  width: 20px;
  text-align: center;
  margin: 2px;
  padding: 2px;
  font-size: 0.8em;
  cursor: help;
  min-height: 1.5em;
  min-width: 1.5em;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
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
.x {
  outline: 2px solid #333;
}
</style>