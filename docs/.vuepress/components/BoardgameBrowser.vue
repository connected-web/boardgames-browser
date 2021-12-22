<template>
  <BoardgameSummary v-if="gameId" :gameId="gameId" />
  <BoardgameList v-else />
</template>

<script>
import sharedModel from './src/sharedModel'

export default {
  data: function () {
    return {
      gameId: false,
    }
  },
  async beforeMount() {
    sharedModel.update()
    const { game } = sharedModel.state.params
    this.$data.gameId = game
  }
}


</script>