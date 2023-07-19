<template>
  <div class="track">
    <h1>API Testing</h1>
    <p>This page is for testing the new Board Games API Services hosted through Connected Web.</p>
    <h3>Status</h3>
    <pre><code>{{ status }}</code></pre>
    <h3>Hello</h3>
    <pre><code>{{ hello }}</code></pre>
  </div>
</template>

<script lang="ts">
import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'

export default {
  components: { },
  data() {
    return {
      client: BoardGamesAPIClient.getSingleton(),
      status: 'Loading status...',
      hello: 'Anybody there?'
    }
  },
  mounted() {
    this.loadStatus()
    this.loadHello()
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
        const response = await client.helloWorld({ name: 'Hannah' })
        this.hello = response?.data ?? 'Sad noises'
      } catch (ex) {
        console.error('Error:', { ex })
        this.hello = `Error: ${(ex as Error)?.message}`
      }
    }
  }
}
</script>