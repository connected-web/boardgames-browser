<template>
  <BoardGameTagSummary v-if="tag && value" :tag="tag" :value="value" />
  <BoardGameTagList v-else />
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
    const { tag, value } = sharedModel.state.params
    this.tag = tag
    this.value = value
  }
}
</script>