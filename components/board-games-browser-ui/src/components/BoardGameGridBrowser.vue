<template>
  <BoardGameGrid v-if="dateCode" :dateCode="dateCode" />
  <BoardGameGridList v-else />
</template>

<script>
import sharedModel from '../helpers/sharedModel'

import BoardGameGrid from './BoardGameGrid.vue'
import BoardGameGridList from './BoardGameGridList.vue'

export default {
  components: { BoardGameGrid, BoardGameGridList },
  props: {
    dateCode: {
      type: String,
      default: null
    }
  },
  async beforeMount() { 
    sharedModel.update()
  }
}
</script>