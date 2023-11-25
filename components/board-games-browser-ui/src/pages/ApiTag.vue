<template>
  <div class="track">
    <h1>Tag Games</h1>
    <TagGameRecords :gameId="$route.params.gameId" />
  </div>
</template>

<script>
import TagGameRecords from '../components/TagGameRecords.vue'

export default {
  components: { TagGameRecords }
}
</script>