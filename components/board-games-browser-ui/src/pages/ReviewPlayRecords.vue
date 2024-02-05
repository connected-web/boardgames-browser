<template>
  <div class="review">
    <h1>Review Play Records</h1>
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