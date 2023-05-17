<template>
  <BoardGameTagSummary v-if="tag && tagValue" :tag="tag" :value="tagValue" />
  <BoardGameTagList v-else />
</template>

<script>
import sharedModel from '../helpers/sharedModel'

import BoardGameTagSummary from './BoardGameTagSummary.vue'
import BoardGameTagList from './BoardGameTagList.vue'

export default {
  components: { BoardGameTagSummary, BoardGameTagList },
  props: {
    tag: {
      type: String,
      default: null
    },
    tagValue: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dateCode: false,
    }
  },
  async beforeMount() { 
    sharedModel.update()
  }
}
</script>