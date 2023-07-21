<template>
  <div class="track">
    <h1>API Testing</h1>
    <p>This page is for testing the new Board Games API Services hosted through Connected Web.</p>

    <h3>Status</h3>
    <pre><code>{{ status }}</code></pre>

    <h3>Hello</h3>
    <pre><code>{{ hello }}</code></pre>

    <h3>List Play Records</h3>
    <pre><code>{{ playRecords }}</code></pre>
  </div>
</template>

<script lang="ts">
import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'

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
      playRecords: { playRecords: [{ message: 'Loading...' }] }
    }
  },
  mounted() {
    this.loadStatus()
    this.loadHello()
    this.listPlayrecords()
  },
  computed: {
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
        this.playRecords = [`Error: ${(ex as Error)?.message}`]
      }
    }
  }
}
</script>