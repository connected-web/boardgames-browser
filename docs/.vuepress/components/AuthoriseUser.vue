<template>
    <div>
        <p>Please register this device using your Boardgames Tracker API key</p>
        <input v-model="apiUsername" placeholder="Type your username">
        <input v-model="apiKey" placeholder="Type your API key">
        <p>{{ message }}</p>
        <br /> 
        <button v-on:click="handleSubmit">Store Credentials</button>
        <button v-on:click="clearCredentials">Clear Credentials from this Device</button>
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
            this.message = 'API Key for ' + this.apiUsername + ' stored on this device'
        },
        clearCredentials() {
            this.apiUsername = ''
            this.apiKey = ''
            localStorage.removeItem('api-user-name')
            localStorage.removeItem('api-user-key')
            this.message = 'Local credentials have been cleared from this device'
        }
    },
    mounted() {
        this.apiUsername = localStorage.getItem('api-user-name')
        this.apiKey = localStorage.getItem('api-user-key')
        if (this.apiUsername) {
            this.message = 'User credentials found for ' + this.apiUsername + ' on this device'
        }
    }
}
</script>