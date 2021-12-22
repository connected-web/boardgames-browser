<template>
  <div>
    <p></p>
    <form v-on:submit="handleSubmit">
          <h3>Which game? <span class="default info">(Required Field!)</span></h3>
          <input type="text" v-model="title" placeholder="The name of the game"  />
         
          <h3>When was the game played? <span class="default info">(Default: today)</span></h3>
          <input type="text" v-model="date" placeholder="dd/mm/yyyy" />

          <h3>Was this game co-operative? <span class="default info">(Default: no)</span></h3>
          <input type="text" v-model="coop" placeholder="Yes / No" />
          
          <h3>Who won? <span class="default info">(Default: draw)</span></h3>
          <input type="text" v-model="winner" placeholder="Who won?" />
          
          <h3>Number of Players <span class="default info">(Default: 2)</span></h3>
          <input type="text" v-model="noOfPlayers" placeholder="How many players were there?" />

          <p class="buttons"><button type="submit">Submit</button></p>
        </form>
        <br />
        <b>Data preview</b>
        <pre>{{JSON.stringify({ title, date, coop, winner, noOfPlayers }, null, 2)}}</pre>
        <p v-if="message">{{message}}</p>
      </div>    
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'

const { boardgamesSamApiUrl } = sharedModel.state

export default {
  data() {
    return {
      title: '',
      date: '',
      coop: '',
      winner: '',
      noOfPlayers: '',
      message: ''
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      console.log(`You played ${this.title} on ${this.date}. ${this.winner} was the winner!`)
      const dataToSend = {
        title: this.title,
        date: this.date,
        coop: this.coop,
        winner: this.winner,
        noOfPlayers: this.noOfPlayers,
      }
      const url = `${boardgamesSamApiUrl}/playrecords/create`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders()
      }
      try {
        console.log('Do the thing')
        await axios.post(url, dataToSend, axiosConfig)
        this.message = "Successfully stored data"
      }
      catch (error) {
        this.message = error.message
        console.error("Could not post to endpoint", error)
      }
    }
  }
}
</script>

<style scoped>
pre {
  color: white
}
input {
  width: 98%;
  padding: 5px;
  font-size: 1.0em;
}
.buttons {
  text-align: right;
}
button {
  padding: 5px;
  font-size: 1.0em;
}
.default.info {
  color: #99A;
}
</style>