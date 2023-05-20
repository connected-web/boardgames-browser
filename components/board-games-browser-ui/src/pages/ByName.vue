<template>
  <div class="by-name">
    <h1>Games by Name</h1>
    <BoardGameSummary v-if="gameId" :gameId="gameId" />
    <BoardGameList v-else />
  </div>
</template>

<script>
import sharedModel from '../helpers/sharedModel'

import BoardGameSummary from '../components/BoardGameSummary.vue'
import BoardGameList from '../components/BoardGameList.vue'

export default {
  components: { BoardGameSummary, BoardGameList },
  props: {
    gameId: {
      type: String,
      default: null
    }
  },
  async beforeMount() {
    sharedModel.update()
  }
}


</script>