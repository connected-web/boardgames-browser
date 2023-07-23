<template>
  <div class="track">
    <h1>API Testing</h1>
    <p>This page is for testing the new Board Games API Services hosted through Connected Web.</p>

    <h3>Status</h3>
    <pre><code>{{ status }}</code></pre>

    <h3>Hello</h3>
    <pre><code>{{ hello }}</code></pre>

    <h3>List Play Records by Current Month</h3>
    <p v-if="currentMonthPlayRecords?.playRecords?.length">Found {{ currentMonthPlayRecords?.playRecords?.length }} play records for {{ currentMonthDateCode }}.</p>
    <pre><code>{{ currentMonthPlayRecords }}</code></pre>

    <h3>List Play Records</h3>
    <p v-if="playRecords?.playRecords?.length">Found {{ playRecords?.playRecords?.length }} play records in total.</p>
    <pre><code>{{ playRecords }}</code></pre>
  </div>
</template>

<script lang="ts">
import BoardGamesAPIClient, { BoardGamesApiClientType } from '../clients/BoardGamesAPIClient'

function upperCaseFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  components: { },
  data() {
    return {
      client: BoardGamesAPIClient.getSingleton(),
      status: 'Loading status...',
      hello: 'Anybody there?',
      currentMonthPlayRecords: { playRecords: [{ message: 'Loading play records for this month...' }] },
      playRecords: { playRecords: [{ message: 'Loading play records for all time...' }] }
    }
  },
  mounted() {
    this.loadStatus()
    this.loadHello()
    this.listPlayrecords()
    this.listPlayrecordsForMonth(this.currentMonthDateCode)
  },
  computed: {
    currentMonthDateCode(): string {
      const now = new Date()
      const yearCode = now.getFullYear() + ''
      const month = (now.getMonth() + 1)
      const monthCode = month >= 10 ? month + '' : '0' + month
      const dateCode = [yearCode, monthCode].join('-')
      return dateCode
    },
    userName(): string {
      const { $vueAuth } = this as any
      const userInfo = $vueAuth?.decodedIdToken?.value
      if (userInfo) {
        const { name, email } = userInfo
        if (name) {
          return name
        }
        if (email) {
          const nameFromEmail = email.split('@')[0].split('.').join(' ')
          return nameFromEmail
        }
      } 
      return ''
    },
    firstName() {
      const { userName } = this
      const words = userName.split(' ')
      const first = words[0] ?? 'N'
      return upperCaseFirst(first)
    }
  },
  methods: {
    async loadStatus() {
      try {
        const client = await this.client.getInstance()
        const response = await client.getStatus()
        console.log('Get Status:', response.status, response.statusText, JSON.stringify(response.data, null, 2))
        this.status = response.data ?? 'No status!'
      } catch (ex) {
        console.error('Error:', { ex })
        this.status = `Error: ${(ex as Error)?.message}`
      }
    },
    async loadHello() {
      try {
        const client = await this.client.getInstance()
        const response = await client.helloWorld({ name: this.firstName })
        this.hello = response?.data ?? 'Sad noises'
      } catch (ex) {
        console.error('Error:', { ex })
        this.hello = `Error: ${(ex as Error)?.message}`
      }
    },
    async listPlayrecords() {
      try {
        const client = await this.client.getInstance()
        const response = await client.listPlayRecords()
        this.playRecords = response?.data ?? ['Sad noises']
      } catch (ex) {
        console.error('Error:', { ex })
        this.playRecords = { playRecords: [{ message: `Error: ${(ex as Error)?.message}` }] }
      }
    },
    async listPlayrecordsForMonth(dateCode:string) {
      try {
        const client:BoardGamesApiClientType = await this.client.getInstance()
        const response = await client.listPlayRecordsByDate({ dateCode }, {})
        this.currentMonthPlayRecords = response?.data ?? ['Sad noises']
      } catch (ex) {
        console.error('Error:', { ex })
        this.currentMonthPlayRecords = { playRecords: [{ message: `Error: ${(ex as Error)?.message}` }] }
      }
    }
  }
}
</script>