<template>
  <div>
    <p>Here is the full list of play records available on the Board Games SAM API:</p>
    <div v-if="playRecords.length">
      <div v-for="record in playRecords" :key="record.key" class="play record">
        <pre><code>{{ record }}</code></pre>
        <button class="trash" v-on:click="removePlayRecord(record.key)">
          <icon icon="trash" />
          <label>Remove Play Record</label>
        </button>
      </div>
      <pre v-if="status.playRecords.length === 0"><code>No play records found</code></pre>
    </div>
    <pre v-else><code>{{ status }}</code></pre>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'
import './src/icons'

const { boardgamesSamApiUrl } = sharedModel.state

function sortPlayRecordsByDate(a, b) {
  const da = (new Date(a.date)).getTime()
  const db = (new Date(b.date)).getTime()
  return db - da
}

export default {
  data() {
    return {
      sharedModel,
      status: 'Loading data...',
      playRecords: [],
      message: ''
    }
  },
  async mounted() {
    return this.listPlayRecords()
  },
  methods: {
    async listPlayRecords() {
      try {
        const url = `${boardgamesSamApiUrl}/playrecords/list`
        const axiosConfig = {
          headers: sharedModel.getAuthHeaders()
        }
        const { data } = await axios.get(url, axiosConfig)
        this.status = data
        this.playRecords = (data?.playRecords || []).sort(sortPlayRecordsByDate)
      } catch (ex) {
        const { data } = ex.response || {}
        this.message = data.message || `Unable to load status: ${ex.message}`
        this.status = data
      }
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
  background: #666;
  border-radius: 1em;
}
button.trash {
  background: #335;
  color: white;
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 0.4em 0.6em;
  border-radius: 0.3em;
  border: none;
  transition: background 0.1s ease-in;
}
button.trash > * {
  vertical-align: middle;
}
button.trash:hover {
  background: #558;
}
button.trash:active {
  background: black;
}
</style>