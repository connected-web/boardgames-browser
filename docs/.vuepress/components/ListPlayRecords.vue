<template>
  <div>
    <p>Here is the full list of play records available on the Boardgames SAM API:</p>
    <div v-if="status.playRecords">
      <div v-for="record in status.playRecords" :key="record.key" class="play record">
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
import icons from './src/icons'

const { boardgamesSamApiUrl } = sharedModel.state

export default {
  data() {
    return {
      sharedModel,
      status: 'Loading data...',
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