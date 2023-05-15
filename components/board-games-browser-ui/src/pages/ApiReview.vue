<template>
  <div class="review">
    <h1>Review Game Records</h1>
    <ListPlayRecords />
  </div>
</template>

<script>
import ListPlayRecords from '../components/ListPlayRecords.vue';

export default {
  components: { ListPlayRecords }
}
</script>