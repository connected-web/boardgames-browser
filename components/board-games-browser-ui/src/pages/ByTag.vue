<template>
  <div class="by-tag">
    <h1>Games by Tag</h1>
    <BoardGameTagBrowser :tag="tag" :tagValue="tagValue" />
  </div>
</template>

<script>
import BoardGameTagBrowser from '../components/BoardGameTagBrowser.vue'

export default {
  components: { BoardGameTagBrowser },
  props: {
    tag: {
      type: String,
      default: null
    },
    tagValue: {
      type: String,
      default: null
    }
  }
}
</script>