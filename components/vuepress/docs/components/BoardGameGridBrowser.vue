<template>
  <BoardGameGrid v-if="dateCode" :dateCode="dateCode" />
  <BoardGameGridList v-else />
</template>

<script>
import sharedModel from './src/sharedModel'

export default {
  data() {
    return {
      dateCode: false,
    }
  },
  async beforeMount() { 
    sharedModel.update()
    const { dateCode } = sharedModel.state.params
    this.dateCode = dateCode
  }
}
</script>