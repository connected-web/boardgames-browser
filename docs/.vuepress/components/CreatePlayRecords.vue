<template>
  <div>
    <p>Hi</p>

    <form v-on:submit="handleSubmit">
          <label>
            Title
            <input 
            type="text"
            v-model="title"
            />
          </label>
          <br />
          <label>
            Date
            <input 
            type="text"
            v-model="date" />
          </label>
          <br />
          <label>
            Co-op
            <input 
            type="text" 
            v-model="coop" />
          </label>
          <br />
          <label>
            Winner
            <input 
            type="text"
            v-model="winner" />
          </label>
          <br />
          <label>
            Number of Players
            <input 
            type="text"
            v-model="noOfPlayers" />
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <b>Data preview</b>
        <pre>{{JSON.stringify({ title, date, coop, winner, noOfPlayers }, null, 2)}}</pre>
        <p v-if="message">{{message}}</p>
      </div>    
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      title: 'Hello Hannah',
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
      try {
        console.log('Do the thing')
        await axios.post('https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod/playrecords/create', dataToSend)
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
</style>