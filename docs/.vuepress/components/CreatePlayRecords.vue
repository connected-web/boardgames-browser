<template>
  <div>
    <p></p>
    <form v-on:submit="handleSubmit">
          <h3>Which game? <span class="default info">(Required Field!)</span></h3>
          <input type="text" v-model="title" placeholder="The name of the game"  />
         
          <h3>When was the game played? <span class="default info">(Default: today, Format: dd/mm/yyyy)</span></h3>
          <input type="text" v-model="date" :placeholder="today" />

          <h3>Was this game co-operative? <span class="default info">(Default: no)</span></h3>
          <div class="row">
            <div :class="coopClass('yes')" v-on:click="selectCoop('yes')">
              <label for="coop-yes">Yes</label>
            </div>
            <div :class="coopClass('no')" v-on:click="selectCoop('no')">
              <label for="coop-no">No</label>
            </div>
          </div>
          
          <h3>Who won? <span class="default info">(Default: draw)</span></h3>
          <div v-if="coop === 'yes'" class="row">
            <div :class="winnerClass('win')" v-on:click="winner = 'win'">
              <label for="coop-yes">Win</label>
            </div>
            <div :class="winnerClass('loss')" v-on:click="winner = 'loss'">
              <label for="coop-no">Loss</label>
            </div>
            <div :class="winnerClass('draw')" v-on:click="winner = 'draw'">
              <label for="coop-no">Draw</label>
            </div>
          </div>
          <div v-else class="row">
            <div :class="winnerClass('Hannah')" v-on:click="winner = 'Hannah'">
              <label for="coop-yes">Hannah</label>
            </div>
            <div :class="winnerClass('John')" v-on:click="winner = 'John'">
              <label for="coop-no">John</label>
            </div>
            <div :class="winnerClass('draw')" v-on:click="winner = 'draw'">
              <label for="coop-no">Draw</label>
            </div>
            <div :class="winnerClass('other')" v-on:click="winner = 'other'">
              <label for="coop-no">Other</label>
            </div>
          </div>
          
          <h3>Number of Players <span class="default info">(Default: 2)</span></h3>
          <input type="text" v-model="noOfPlayers" placeholder="How many players were there?" />

          <p class="buttons"><button type="submit">Submit</button></p>
        </form>
        <br />
        <b>Data preview</b>
        <pre>{{JSON.stringify({ dataToSend }, null, 2)}}</pre>
        <p v-if="message">{{message}}</p>
      </div>    
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'
import dayjs from 'dayjs'

const { boardgamesSamApiUrl } = sharedModel.state

export default {
  data() {
    return {
      title: '',
      date: '',
      coop: 'no',
      winner: '',
      noOfPlayers: '',
      message: ''
    }
  },
  computed: {
    today() {
      const now = new Date()
      return dayjs(now).format('DD/MM/YYYY')
    },
    dataToSend() {
      return {
        title: this.title,
        date: this.date || this.today,
        coop: this.coop || 'no',
        winner: this.winner || 'draw',
        noOfPlayers: Number.parseInt(this.noOfPlayers) || 2,
      }
    }
  },
  methods: {
    coopClass(value) {
      const selected = value === this.coop
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    winnerClass(value) {
      const selected = value === this.winner
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    selectCoop(value) {
      this.coop = value
      this.winner = ''
    },
    async handleSubmit(event) {
      event.preventDefault()
      console.log(`You played ${this.title} on ${this.date}. ${this.winner} was the winner!`)
      const url = `${boardgamesSamApiUrl}/playrecords/create`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders()
      }
      try {
        console.log('Do the thing')
        await axios.post(url, this.dataToSend, axiosConfig)
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
div.row {
  display: flex;
}
div.option {
  flex: 5 5;
  background: peachpuff;
  margin: 0 0.5em;
  font-weight: bold;
  padding: 0.5em;
  text-align: center;
  transition: background 0.1s ease-out;
  border: 2px solid orange;
}
div.option.selected {
  background: lightskyblue;
  border: 2px solid navy;
}
</style>