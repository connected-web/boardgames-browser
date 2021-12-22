<template>
  <div>
    <p>Here is the full list of play records available on the Boardgames SAM API:</p>
    <div v-if="status.playRecords">
      <pre v-for="record in status.playRecords" :key="record.key"><code>{{ record }}</code></pre>
    </div>
    <pre v-else><code>{{ status }}</code></pre>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'

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
  }
}
</script>