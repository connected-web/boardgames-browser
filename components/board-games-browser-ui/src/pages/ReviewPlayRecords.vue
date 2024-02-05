<template>
  <div class="review">
    <div class="row p5">
      <h1>Play Records</h1>
      <span class="spacer"></span>
      <router-link v-if="dateCode" :to="`/stats/by-month/${dateCode}`" class="button">
        <icon icon="chart-area" />
        <label class="fulltext">Play Stats</label>
      </router-link>
      <router-link v-else :to="`/stats/month-to-date`" class="button">
        <icon icon="chart-area" />
        <label class="fulltext">Play Stats</label>
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