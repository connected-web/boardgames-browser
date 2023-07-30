<template>
  <div class="grids">
    <h1>Stats by Grid</h1>
    <p>Board game challenge grids track multiple plays for a set of games.</p>

    <BoardGameGridBrowser :dateCode="dateCode" />
  </div>
</template>

<script>
import BoardGameGridBrowser from '../components/BoardGameGridBrowser.vue'

export default {
  components: { BoardGameGridBrowser },
  props: {
    dateCode: {
      type: String,
      default: null
    }
  }
}
</script>