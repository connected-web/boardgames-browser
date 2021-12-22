<template>
  <BoardgameGrid v-if="$data.dateCode" :dateCode="$data.dateCode" />
  <BoardgameGridList v-else />
</template>

<script>
import sharedModel from './src/sharedModel'

export default {
  data: function () {
    return {
      dateCode: false,
    }
  },
  async beforeMount() { 
    sharedModel.update()
    const { dateCode } = sharedModel.state.params
    this.$data.dateCode = dateCode
  }
}
</script>