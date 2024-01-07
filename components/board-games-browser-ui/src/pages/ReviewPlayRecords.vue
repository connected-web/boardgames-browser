<template>
  <div class="review">
    <h1>Review Play Records</h1>
    <ListPlayRecords />
  </div>
</template>

<script>
import ListPlayRecords from '../components/ListPlayRecords.vue';

export default {
  components: { ListPlayRecords }
}
</script>