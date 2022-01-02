<template>
  <BoardGameGrid v-if="$data.dateCode" :dateCode="$data.dateCode" />
  <BoardGameGridList v-else />
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