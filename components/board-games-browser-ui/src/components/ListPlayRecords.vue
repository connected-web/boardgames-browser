<template>
  <div>
    <p v-if="message">
      <span>{{ message }}</span>
    </p>
    <div v-if="playRecordToBeRemoved" class="remove-play-record">
      <p class="warn">Are you sure you want to remove this play record?</p>
      <div class="play record">
        <pre><code>{{ playRecordToBeRemoved }}</code></pre>
      </div>
      <div class="button-row">
        <button v-on:click="playRecordToBeRemoved = false">
          <icon icon="backspace" />
          <label>No leave it alone...</label>
        </button>
        <button v-on:click="removePlayRecord(playRecordToBeRemoved.key)">
          <icon icon="trash" />
          <label>Yes Remove Play Record</label>
        </button>
      </div>
    </div>
    <div v-else class="list-of-play-records">
      <p>Here is the full list of play records available on the Board Games SAM API:</p>
      <div v-if="playRecords.length">
        <div v-for="record in playRecords" :key="record.key" class="play record">
          <pre><code>{{ record }}</code></pre>
          <button class="trash" v-on:click="askToRemovePlayRecord(record)">
            <icon icon="trash" />
            <label>Remove Play Record</label>
          </button>
        </div>
        <pre v-if="playRecords?.length === 0"><code>No play records found</code></pre>
      </div>
      <LoadingSpinner v-if="loading">{{ status }}</LoadingSpinner>
      <p v-else-if="status">{{ status }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from '../helpers/sharedModel'

import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesSamApiUrl } = sharedModel.state

function convertDate(date) {
  const [dd, mm, yyyy] = date.split('/')
  return new Date([yyyy, mm, dd].join('-'))
}

function sortPlayRecordsByDate(a, b) {
  const da = convertDate(a.date).getTime()
  const db = convertDate(b.date).getTime()
  return db - da
}

export default {
  components: { LoadingSpinner },
  data() {
    return {
      sharedModel,
      loading: false,
      status: 'Loading data...',
      playRecords: [],
      playRecordToBeRemoved: false,
      message: ''
    }
  },
  async mounted() {
    return this.listPlayRecords()
  },
  methods: {
    async listPlayRecords() {
      this.loading = true
      try {
        const url = `${boardgamesSamApiUrl}/playrecords/list`
        const axiosConfig = {
          headers: sharedModel.getAuthHeaders()
        }
        const { data } = await axios.get(url, axiosConfig)
        this.status = 'Loaded'
        this.playRecords = (data?.playRecords || []).sort(sortPlayRecordsByDate)
      } catch (ex) {
        const { data } = ex.response || {}
        this.message = data.message || `Unable to load status: ${ex.message}`
        this.status = 'Error'
      }
      this.loading = false
    },
    askToRemovePlayRecord(playRecord) {
      this.message = ''
      this.playRecordToBeRemoved = playRecord
    },
    async removePlayRecord(key) {
      try {
        const url = `${boardgamesSamApiUrl}/playrecords/delete`
        const axiosConfig = {
          headers: sharedModel.getAuthHeaders(),
          data: {
            keypath: key
          }
        }
        const { data } = await axios.delete(url, axiosConfig)
        console.log('Delete', key, data)
        this.playRecordToBeRemoved = false
        this.message = `Play record ${key} removed!`
        return this.listPlayRecords()
      } catch (ex) {
        this.message = data.message || `Unable to remove play record: ${ex.message}`
      }
    }
  }
}
</script>

<style scoped>
.play.record {
  position: relative;
  background: #aaa;
  border-radius: 1em;
  padding: 1em;
  margin: 1em 0;
}
.button-row {
  display: flex;
  justify-content: flex-end;
}
button.trash {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
}
pre {
  overflow-x: hidden;
  white-space: pre-wrap;
}
</style>