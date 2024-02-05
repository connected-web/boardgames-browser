<template>
  <div class="review">
    <div class="row p5">
      <h1>Review Play Records</h1>
      <span class="spacer"></span>
      <router-link :to="`/stats/by-month/${dateCode}`" class="button">
        <icon icon="chart-area" />
        <label>Play Stats</label>
      </router-link>
    </div>

    <ListPlayRecords :dateCode="dateCode" />
  </div>
</template>

<script lang="ts">
import ListPlayRecords from '../components/ListPlayRecords.vue';

export default {
  components: { ListPlayRecords },
  props: {
    dateCode: {
      type: String,
      default: ''
    }
  }
}
</script>