<template>
  <div class="review">
    <h1>View Play Record</h1>
    <p class="breadcrumbs">
      <router-link :to="`/api/review`">Play Records</router-link>
      /
      <router-link :to="`/api/review/${dateCode}`">{{ dateCode }}</router-link>
      /
      <span>View</span>
    </p>
  
    <p v-if="loadingPlayrecord"><LoadingSpinner>Loading play record to view... 
      <code>{{ playRecordKey }}</code>
    </LoadingSpinner></p>
    <div v-else-if="playRecord" class="column p5">
      <p>Viewing play record <code>{{ playRecordKey }}</code></p>
      <pre><code>{{ playRecordData }}</code></pre>
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
      <div v-if="(playRecord.history?.length ?? 0) > 0">
        <h3>History</h3>
        <p>This play record has had <b>{{ playRecord.history?.length }}</b> previous edits.</p>
        <div class="column p5">
          <div v-for="(historyItem, index) in playRecord.history" :key="index">
            <pre><code>{{ historyItem }}</code></pre>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>History</h3>
        <p>This play record has no history of being edited since it was created.</p>
      </div>
  </div>
    <p v-else>No play record found with the key <code>{{ playRecordKey }}</code></p>
  </div>
</template>

<script lang="ts">
import LoadingSpinner from '../components/LoadingSpinner.vue'
import BoardGamesAPIClient, { PlayRecordModel } from '../clients/BoardGamesAPIClient'
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
      loadingPlayrecord: false
    }
  },
  computed: {
    playRecordData() {
      if (!this.playRecord) {
        return null
      }
      const clonedPlayRecord = JSON.parse(JSON.stringify(this.playRecord))
      delete clonedPlayRecord.history
      delete clonedPlayRecord.key
      return clonedPlayRecord
    },
    dateCode() {
      const reverseDate:string | undefined = /(\d{2}\/\d{2}\/\d{4})/.exec(String(this.playRecord?.date))?.[1]
      if (reverseDate !== undefined) {
        return reverseDate.split('/').reverse().join('-').slice(0, 7)
      }
      return /(\d{4}-\d{2})/.exec(this.playRecordKey)?.[1] ?? '????'
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