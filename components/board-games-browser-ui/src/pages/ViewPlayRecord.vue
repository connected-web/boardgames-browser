<template>
  <div class="review">
    <h1>View Play Record</h1>
    <p v-if="loadingPlayrecord"><LoadingSpinner>🚧 Loading play record to view... 
      <code>{{ playRecordKey }}</code>
    </LoadingSpinner></p>
    <div v-else-if="playRecord" class="column p5">
      <p>Viewing play record <code>{{ playRecordKey }}</code></p>
      <pre><code>{{ playRecord }}</code></pre>
      <div class="row p5">
        <router-link :to="`/api/playrecord/edit/${encodeURIComponent(playRecordKey)}`" class="button">
          <icon icon="pen" />
          <label>Edit</label>
        </router-link>
        <router-link :to="`/api/playrecord/delete/${encodeURIComponent(playRecordKey)}`" class="button">
          <icon icon="trash" />
          <label>Delete</label>
        </router-link>
      </div>
  </div>
    <p v-else>No play record found with the key <code>{{ playRecordKey }}</code></p>
  </div>
</template>

<script lang="ts">
import LoadingSpinner from '../components/LoadingSpinner.vue'
import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'

export default {
  components: { LoadingSpinner },
  props: {
    playRecordKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playRecord: null as null | PlayRecordModel,
      loadingPlayrecord: false
    }
  },
  mounted() {
    this.loadPlayRecord()
  },
  methods: {
    async loadPlayRecord() {
      this.loadingPlayrecord = true
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      try {
        const response = await client.getPlayrecordsViewPlayRecordKey({ playRecordKey: this.playRecordKey })
        const playRecord = response.data
        console.log('Loaded play record', { playRecord })
        this.playRecord = playRecord
      } catch (err) {
        const error = err as AxiosError
        if (error.response?.status === 404) {
          console.log('Play record not found', { error })
        } else {
          console.error('Failed to load play record', { error })
        }
      }
      this.loadingPlayrecord = false
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

pre > code {
  background-color: inherit;
}
</style>