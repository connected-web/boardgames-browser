<template>
  <div class="review">
    <h1>Delete Play Record</h1>
    <p v-if="loadingPlayrecord"><LoadingSpinner>🚧 Checking that play record exists... 
      <code>{{ playRecordKey }}</code>
    </LoadingSpinner></p>
    <div v-else-if="playRecord" class="column p5">
      <p>Are you sure you want to delete <code>{{ playRecordKey }}</code>?</p>
      <pre><code>{{ playRecord }}</code></pre>
      <div class="row p5">
        <router-link :to="`/api/playrecord/view/${encodeURIComponent(playRecordKey)}`" class="button">
          <icon icon="backspace" />
          <label>Cancel</label>
        </router-link>
        <router-link :to="`/api/playrecord/delete/${encodeURIComponent(playRecordKey)}`" class="button">
          <icon icon="trash" />
          <label>Confirm Delete</label>
        </router-link>
      </div>
  </div>
    <p v-else>No play record found with the key <code>{{ playRecordKey }}</code></p>
  </div>
</template>

<script lang="ts">
import LoadingSpinner from '../components/LoadingSpinner.vue'
import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'
import { AxiosError } from 'openapi-client-axios'

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
      loadingPlayrecord: false,
      message: ''
    }
  },
  mounted() {
    this.loadPlayRecord()
  },
  methods: {
    async loadPlayRecord() {
      this.loadingPlayrecord = true
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      const response = await client.getPlayrecordsViewPlayRecordKey({ playRecordKey: this.playRecordKey })
      const playRecord = response.data
      console.log('Loaded play record', { playRecord })
      this.playRecord = playRecord
      this.loadingPlayrecord = false
    },
    async removePlayRecord(playRecordKey: string) {
      try {
        const client = await BoardGamesAPIClient.getSingleton().getInstance()
        await client.deletePlayrecordsDelete(null, { keypath: playRecordKey })
      } catch (ex) {
        const body = (ex as AxiosError)?.response?.data
        const message = (body as any)?.message ?? (ex as Error)?.message
        console.warn('Unable to remove play record:', { message })
        this.message = `Unable to remove play record: ${message}`
      }
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