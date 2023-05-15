<template>
  <div>
    <p>Use this form to register this device using your Board Games Tracker API key.</p>
    <div class="form-inputs">
      <input v-model="apiUsername" placeholder="Type your username">
      <input v-model="apiKey" placeholder="Type your API key">
    </div>
    <p class="message">{{ message }}</p>
    <p class="buttons">
      <button v-on:click="handleSubmit">Store Credentials</button>
      <button v-on:click="clearCredentials">Clear Credentials from this Device</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return{
      apiUsername: '',
      apiKey: '',
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      localStorage.setItem('api-user-name', this.apiUsername)
      localStorage.setItem('api-user-key', this.apiKey)
      this.message = 'API Key for ' + this.apiUsername + ' stored on this device.'
    },
    clearCredentials() {
      this.apiUsername = ''
      this.apiKey = ''
      localStorage.removeItem('api-user-name')
      localStorage.removeItem('api-user-key')
      this.message = 'Local credentials have been cleared from this device.'
    }
  },
  mounted() {
    this.apiUsername = localStorage.getItem('api-user-name')
    this.apiKey = localStorage.getItem('api-user-key')
    if (this.apiUsername) {
      this.message = 'Found user credentials for ' + this.apiUsername + ' on this device.'
    }
  }
}
</script>

<style scoped>
input {
  display: inline-block;
  padding: 1em;
  font-family: inherit;
  width: 60%;
  min-width: 200px;
  margin: 0.5em;
  text-align: center;
}
.form-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message {
  text-align: center;
}
.buttons {
  text-align: center;
}
</style>