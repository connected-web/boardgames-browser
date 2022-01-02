<template>
  <BoardGameSummary v-if="gameId" :gameId="gameId" />
  <BoardGameList v-else />
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