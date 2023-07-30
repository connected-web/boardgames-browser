<template>
  <div class="by-month">
    <h1>Graph Explorer</h1>

    <BoardGameGraphsByMonth :filters="filters" />
  </div>
</template>

<script>
import BoardGameGraphsByMonth from '../components/BoardGameGraphsByMonth.vue';

export default {
  props: {
    filters: {
      type: String,
      default: ''
    }
  },
  components: { BoardGameGraphsByMonth }
}
</script>