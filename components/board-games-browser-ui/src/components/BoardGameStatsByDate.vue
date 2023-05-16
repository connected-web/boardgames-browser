<template>
  <div>
    <BoardGameStatsViewer v-if="dateCode" :datasourceUrl="statsUrl" />
  </div>
</template>

<script>
import sharedModel from '../helpers/sharedModel'
const { boardgamesApiUrl } = sharedModel.state

import BoardGameStatsViewer from './BoardGameStatsViewer.vue'

export default {
  components: { BoardGameStatsViewer },
  props: {
    dateCode: {
      type: String,
      default: null
    }
  },
  computed: {
    statsUrl() {
      const { dateCode } = this
      const path = dateCode?.length === 4 ? `byYear/${dateCode}` : `byMonth/${dateCode}`
      return `${boardgamesApiUrl}/api/boardgame/stats/${path}`
    }
  },
  async beforeMount() { 
    sharedModel.update()
  }
}
</script>