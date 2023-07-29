<template>
  <div>
    <p>{{ serviceSelection?.message }}</p>
    
    <div v-if="playRecordToBeRemoved" class="remove-play-record">
      <p class="warn">Are you sure you want to remove this play record?</p>
      <div class="play record">
        <pre><code>{{ playRecordToBeRemoved }}</code></pre>
      </div>
      <div class="button-row row p10">
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
      <div v-if="playRecords.length">
        <p>Here is the list of the most recent raw play records available on the {{ serviceSelection?.name }} for {{ dateCode }}:</p>
        <div v-for="record in playRecords" :key="record.key" class="play record">
          <pre><code>{{ record }}</code></pre>
          <button class="trash" v-on:click="askToRemovePlayRecord(record)">
            <icon icon="trash" />
            <label>Remove Play Record</label>
          </button>
        </div>
        <pre v-if="playRecords?.length === 0"><code>No play records found</code></pre>
      </div>
      <p v-if="loading">
        <LoadingSpinner>{{ status }}</LoadingSpinner>
      </p>
      <div v-else-if="status" >
        <h3 class="status">Status: {{ status }}</h3>
        <p>
          <span>{{ message ? message : 'No messages.' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from '../helpers/sharedModel'
import checkServiceSelection from './helpers/checkServiceSelection'

import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesSamApiUrl } = sharedModel.state

import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'

function convertDate(date) {
  const [dd, mm, yyyy] = (date ?? '').split('/')
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
      message: '',
      serviceSelection: 'Not sure...'
    }
  },
  async mounted() {
    this.serviceSelection = await this.checkServiceSelection(this.$vueAuth)
    this.listPlayRecords()
  },
  computed: {
    dateCode() {
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const monthCode = currentMonth >= 10 ? currentMonth + '' : '0' + currentMonth
      const dateCode = [now.getFullYear(), monthCode].join('-')
      return dateCode
    }
  },
  methods: {
    checkServiceSelection,
    async listPlayRecords() {
      this.loading = true
      if (this.serviceSelection?.service === 'None') {
        this.playRecords = []
        return
      }

      try {
        this.playRecords = await (this.serviceSelection?.service === 'OAuth' ? this.listPlayRecordsFromCDKAPI() : this.listPlayRecordsFromSAMAPI())
        this.status = 'Loaded'
        this.message = `Found ${this.playRecords?.length ?? 0} play records.`
      } catch (ex) {
        const { data } = ex.response || {}
        this.message = data?.message || `Unable to load status: ${ex?.message}`
        this.status = 'Error'
      }
      this.loading = false
    },
    async listPlayRecordsFromSAMAPI() {
      const url = `${boardgamesSamApiUrl}/playrecords/list`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders()
      }
      const { data } = await axios.get(url, axiosConfig)
      return (data?.playRecords ?? []).sort(sortPlayRecordsByDate)
    },
    async listPlayRecordsFromCDKAPI() {
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      const { dateCode } = this
      const { data } = await client.listPlayRecordsByDate({ dateCode })
      return (data?.playRecords ?? []).sort(sortPlayRecordsByDate)
    },
    askToRemovePlayRecord(playRecord) {
      this.message = ''
      this.playRecordToBeRemoved = playRecord
    },
    async removePlayRecord(key) {
      const { playRecordToBeRemoved } = this
      try {
        const response = await (this.serviceSelection?.service === 'OAuth' ? this.removePlayRecordFromCDKAPI(key) : this.removePlayRecordFromSAMAPI(key))
        console.log('Delete', key, playRecordToBeRemoved)
        this.playRecordToBeRemoved = false
        this.message = `Play record ${key} removed!`
        return this.listPlayRecords()
      } catch (ex) {
        console.warn('Unable to remove play record:', { message: ex.message })
        this.message = `Unable to remove play record: ${ex?.message}`
      }
    },
    async removePlayRecordFromSAMAPI(key) {
      const url = `${boardgamesSamApiUrl}/playrecords/delete`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders(),
        data: {
          keypath: key
        }
      }
      return axios.delete(url, axiosConfig)
    },
    async removePlayRecordFromCDKAPI(key) {
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      return client.deletePlayRecord(null, { keypath: key })
    }
  }
}
</script>

<style scoped>
.play.record {
  position: relative;
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
  font-size: 0.85em;
}
pre {
  overflow-x: hidden;
  white-space: pre-wrap;
}
</style>