<template>
  <BoardgameTagSummary v-if="$data.tag && $data.value" :tag="$data.tag" :value="$data.value" />
  <BoardgameTagList v-else />
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
    const { tag, value } = sharedModel.state.params
    this.$data.tag = tag
    this.$data.value = value
  }
}
</script>