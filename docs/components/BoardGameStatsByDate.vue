<template>
  <div>
    <p>Date code: {{ dateCode || 'No date code set' }}</p>
    <BoardGameStatsViewer v-if="dateCode" :datasourceUrl="statsUrl" />
  </div>
</template>

<script>
import sharedModel from './src/sharedModel'
const { boardgamesApiUrl } = sharedModel.state

export default {
  data() {
    return {
      dateCode: false,
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
    const dateCode = sharedModel.state?.params?.dateCode || sharedModel.state?.lastDateCode
    this.dateCode = dateCode
  }
}
</script>