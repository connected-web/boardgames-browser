<template>
  <div>
    <p class="breadcrumbs">
      <router-link :to="`/api/review`">Play Records</router-link>
      /
      <router-link v-if="dateCode !== ''" :to="`/api/review/${dateCode}`">{{ dateCode }}</router-link>
      <span v-else>Latest</span>
    </p>
    <p class="auth-info">{{ serviceSelection?.message }}</p>
    
    <div v-if="serviceSelection?.authed === false">
      <p>This page requires user credentials to access and manipulate the latest play records.</p>
    </div>
    <div v-else class="list-of-play-records">
      <p v-if="loading">
        <LoadingSpinner>Loading play records...</LoadingSpinner>
      </p>
      <div v-if="playRecords.length">
        <p v-if="dateCode !== ''">Here is the list of the play records available on the {{ serviceSelection?.name }} for {{ dateCode }}.</p>
        <p v-else>Here is the list of the latest play records available on the {{ serviceSelection?.name }} for
          <router-link :to="`/api/review/${currentMonth}`">{{ currentMonth }}</router-link> and
          <router-link :to="`/api/review/${previousMonth}`">{{ previousMonth }}</router-link>:</p>
        <div v-for="record in playRecords" :key="record.key" class="play record">
          <pre><code>{{ record }}</code></pre>
          <div class="row p5 record-buttons">
            <router-link :to="`/api/playrecord/view/${encodeURIComponent(record?.key ?? '')}`" class="button">
              <label class="fulltext">Details</label>
              <icon icon="clipboard-list" />
            </router-link>
          </div>
        </div>
        <pre v-if="playRecords?.length === 0"><code>No play records found</code></pre>
      </div>
      <div v-else-if="status" >
        <h3 class="status">Status: {{ status }}</h3>
        <p>
          <span>{{ message ? message : 'No messages.' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import sharedModel from '../helpers/sharedModel'
import checkServiceSelection, { ServiceSummary } from './helpers/checkServiceSelection'
import dayjs from 'dayjs'

import LoadingSpinner from './LoadingSpinner.vue'

import BoardGamesAPIClient, { PlayRecordModel } from '../clients/BoardGamesAPIClient'
import { AxiosError } from 'openapi-client-axios'

function convertDate(date: string) {
  const [dd, mm, yyyy] = (date ?? '').split('/')
  return new Date([yyyy, mm, dd].join('-'))
}

function sortPlayRecordsByDate(a: PlayRecordModel, b: PlayRecordModel) {
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
      playRecords: [] as PlayRecordModel[],
      message: '',
      serviceSelection: {
        message: 'Not sure...'
      } as Partial<ServiceSummary>,
      refreshTimer: 0
    }
  },
  props: {
    dateCode: {
      type: String,
      default: ''
    }
  },
  async mounted() {
    const $vueAuth = (this as any).$vueAuth
    this.serviceSelection = await this.checkServiceSelection($vueAuth)
    this.listPlayRecords()
    clearInterval(this.refreshTimer)
    this.refreshTimer = setInterval(async () => {
      this.serviceSelection = await this.checkServiceSelection($vueAuth)
    }, 10000)
  },
  async unmounted() {
    clearInterval(this.refreshTimer)
    this.serviceSelection = {}
  },
  computed: {
    currentMonth() {
      return dayjs().format('YYYY-MM')
    },
    previousMonth() {
      const lastMonth = dayjs().subtract(1, 'month')
      return dayjs(lastMonth).format('YYYY-MM')
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
        this.playRecords = await this.listPlayRecordsForDatecode()
        this.status = 'Loaded'
        this.message = `Found ${this.playRecords?.length ?? 0} play records.`
      } catch (ex) {
        const error = ex as AxiosError
        const { data } = (error.response || {}) as Record<string, Record<string, string>>
        this.message = data?.message || `Unable to load status: ${error?.message}`
        this.status = 'Error'
      }
      this.loading = false
    },
    async listPlayRecordsForDatecode(): Promise<PlayRecordModel[]> {
      const { dateCode, currentMonth, previousMonth } = this
      if (dateCode !== '') {
        const client = await BoardGamesAPIClient.getSingleton().getInstance()
        const response = await client.getPlayrecordsListDateCode({ dateCode })
        return response?.data?.playRecords ?? []
      } else {
        const client = await BoardGamesAPIClient.getSingleton().getInstance()
        const dataSets = await Promise.all([
          client.getPlayrecordsListDateCode({ dateCode: currentMonth }),
          client.getPlayrecordsListDateCode({ dateCode: previousMonth })
        ])
        const playRecords = dataSets.map(response => response?.data?.playRecords ?? []).flat()
        return playRecords.sort(sortPlayRecordsByDate)
      }
    }
  },
  watch: {
    dateCode() {
      this.listPlayRecords()
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
.record-buttons {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  font-size: 0.85em;
}
pre {
  overflow-x: hidden;
  white-space: pre-wrap;
}

dialog {
  position: fixed;
  top: 10vh;
  left: 0;
  overflow: auto;
  z-index: 200;
  border: 0;
  background: white;
  border-radius: 10px;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 199;
  background: rgba(0, 0, 0, 0.5);
}

</style>