<template>
  <div class="review">
    <h1>Edit Play Record</h1>
    <p><LoadingSpinner>🚧 Loading play record to edit... 
      <code>{{ playRecordKey }}</code>
    </LoadingSpinner></p>
  </div>
</template>

<script lang="ts">
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  components: { LoadingSpinner },
  props: {
    playRecordKey: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
code {
  font-family: monospace;
  background-color: #eee;
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
  font-size: 0.8em;
}
</style>