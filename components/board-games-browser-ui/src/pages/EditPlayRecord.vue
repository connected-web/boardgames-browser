<template>
  <div class="review">
    <h1>Edit Play Record</h1>
    <p v-if="loadingPlayrecord"><LoadingSpinner>🚧 Loading play record to edit... 
      <code>{{ playRecordKey }}</code>
    </LoadingSpinner></p>
    <div v-else-if="playRecord?.error">
      <div class="error">
        <h3>Error</h3>
        <p>{{ playRecord.error }}</p>
      </div>
    </div>
    <div v-else-if="playRecord">
      <p>Editing play record <code>{{ playRecordKey }}</code></p>
      <div class="p5 expand">
        <textarea v-model="playRecordJson" class="raw-playrecord"></textarea>
        <p v-if="message">{{ message }}</p>
        <div class="row p5">
          <router-link :to="`/api/playrecord/view/${encodeURIComponent(playRecordKey)}`" class="button">
            <icon icon="backspace" />
            <label>Cancel</label>
          </router-link>
          <button v-on:click="savePlayRecord(playRecordKey, playRecordJson)" :disabled="savingPlayrecord">
            <LoadingSpinner v-if="savingPlayrecord">Saving...</LoadingSpinner>
            <icon v-if="!savingPlayrecord" icon="save" />
            <label v-if="!savingPlayrecord">Save</label>
          </button>
        </div>
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
      playRecordJson: '',
      loadingPlayrecord: false,
      savingPlayrecord: false,
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
      this.playRecordJson = JSON.stringify(playRecord, null, 2)
      this.loadingPlayrecord = false
    },
    async savePlayRecord(playRecordKey: string, playRecordJson: string) {
      this.savingPlayrecord = true
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      try {
        const playRecord = JSON.parse(playRecordJson)
        playRecord.key = playRecordKey
        const response = await client.putPlayrecordsUpdate({}, playRecord)
        console.log('Saved play record', { playRecord, response: response?.data })
        this.playRecord = playRecord
        this.playRecordJson = JSON.stringify(playRecord, null, 2)
      } catch (ex) {
        const error = (ex as Error)?.message ?? (ex as any)?.response?.data?.message ?? ex
        console.warn('Unable to save play record:', { error })
        this.message = `Unable to save play record: ${error}`
      }
      this.savingPlayrecord = false
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

textarea.raw-playrecord {
  min-width: 95%;
  max-width: 95%;
  min-height: 20em;
  border-radius: 10px;
  padding: 10px;
}

.expand {
  justify-content: stretch;
  align-content: stretch;
}
</style>