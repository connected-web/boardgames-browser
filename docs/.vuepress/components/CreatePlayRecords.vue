<template>
  <div>
    <p></p>
    <form v-on:submit="handleSubmit">
          <h3>What was the name of the game?</h3>
          <p class="default info">(Required Field!)</p>
          <v-select taggable :options="listOfGames" v-model="name" />
         
          <h3>When was the game played?</h3>
          <p class="default info">(Default: today, Format: dd/mm/yyyy)</p>
          <div class="row">
            <input type="text" v-model="date" :placeholder="dateToday" />
            <div :class="dateClass(dateToday)" v-on:click="selectDate(dateToday)">
              <label for="date-today">Today ({{ dayOfMonth(dateToday) }})</label>
            </div>
            <div :class="dateClass(dateYesterday)" v-on:click="selectDate(dateYesterday)">
              <label for="date-yesterday">Yesterday ({{ dayOfMonth(dateYesterday) }})</label>
            </div>
            <div :class="dateClass(dateTwoDaysAgo)" v-on:click="selectDate(dateTwoDaysAgo)">
              <label for="date-yesterday">{{ twoDaysAgo }} ({{ dayOfMonth(dateTwoDaysAgo) }})</label>
            </div>
          </div>

          <h3>Was this game vs. or co-operative?</h3>
          <p class="default info">(Default: vs)</p>
          <div class="row">
            <div :class="coOpClass('no')" v-on:click="selectCoop('no')">
              <label for="coOp-no">Vs</label>
            </div>
            <div :class="coOpClass('yes')" v-on:click="selectCoop('yes')">
              <label for="coOp-yes">Co-op</label>
            </div>
          </div>
          
          <h3>Who won?</h3>
          <p class="default info">(Default: draw)</p>
          <div v-if="coOp === 'yes'" class="row">
            <div :class="coOpOutcomeClass('win')" v-on:click="coOpOutcome = 'win'">
              <label for="coOp-yes">Win</label>
            </div>
            <div :class="coOpOutcomeClass('loss')" v-on:click="coOpOutcome = 'loss'">
              <label for="coOp-no">Loss</label>
            </div>
            <div :class="coOpOutcomeClass('draw')" v-on:click="coOpOutcome = 'draw'">
              <label for="coOp-no">Draw</label>
            </div>
          </div>
          <div v-else class="row">
            <div :class="winnerClass('Hannah')" v-on:click="winner = 'Hannah'">
              <label for="coOp-yes">Hannah</label>
            </div>
            <div :class="winnerClass('John')" v-on:click="winner = 'John'">
              <label for="coOp-no">John</label>
            </div>
            <div :class="winnerClass('draw')" v-on:click="winner = 'draw'">
              <label for="coOp-no">Draw</label>
            </div>
            <div :class="winnerClass('other')" v-on:click="winner = 'other'">
              <label for="coOp-no">Other</label>
            </div>
          </div>
          
          <h3>Number of Players</h3>
          <p class="default info">(Default: 2)</p>
          <div class="row">
            <input type="text" v-model="noOfPlayers" placeholder="#" />
            <div :class="playerCountClass('2')" v-on:click="noOfPlayers = 2">
              <label for="coOp-yes">2</label>
            </div>
            <div :class="playerCountClass('3')" v-on:click="noOfPlayers = 3">
              <label for="coOp-no">3</label>
            </div>
            <div :class="playerCountClass('4')" v-on:click="noOfPlayers = 4">
              <label for="coOp-no">4</label>
            </div>
          </div>

          <p class="buttons">
            <button v-if="sending" type="submit" disabled>Sending...</button>
            <button v-else type="submit">Submit</button>
          </p>
          <p v-if="message">{{message}}</p>
        </form>
        <br />
        <b>Data preview</b>
        <pre>{{JSON.stringify({ dataToSend }, null, 2)}}</pre>
      </div>    
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import './src/icons'
import sharedModel from './src/sharedModel'

dayjs.extend(advancedFormat)

const { boardgamesApiUrl, boardgamesSamApiUrl } = sharedModel.state

export default {
  components: { vSelect },
  data() {
    return {
      name: '',
      date: '',
      coOp: '',
      winner: '',
      coOpOutcome: '',
      noOfPlayers: '',
      message: '',
      listOfGames: [],
      sending: false
    }
  },
  computed: {
    dateToday() {
      const now = new Date()
      return dayjs(now).format('DD/MM/YYYY')
    },
    dateYesterday() {
      const yesterday = dayjs().add(-1, 'day')
      return dayjs(yesterday).format('DD/MM/YYYY')
    },
    dateTwoDaysAgo() {
      const pastDate = dayjs().add(-2, 'day')
      return dayjs(pastDate).format('DD/MM/YYYY')
    },
    twoDaysAgo() {
      const pastDate = dayjs().add(-2, 'day')
      return dayjs(pastDate).format('dddd')
    },
    dataToSend() {
      const result = {
        name: this.name,
        date: this.date || this.dateToday,
        coOp: this.coOp || 'no',
        noOfPlayers: Number.parseInt(this.noOfPlayers + '') || 2,
      }

      if (this.coOp === 'yes') {
        result.coOpOutcome = this.coOpOutcome || 'draw'
      } else {
        result.winner = this.winner || 'draw'
      }

      return result
    }
  },
  methods: {
    coOpClass(value) {
      const selected = value === this.coOp
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    dateClass(value) {
      const selected = value === this.date
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    winnerClass(value) {
      const selected = value === this.winner
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    coOpOutcomeClass(value) {
      const selected = value === this.coOpOutcome
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    playerCountClass(value) {
      const selected = (value + '') === (this.noOfPlayers + '')
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    selectCoop(value) {
      this.coOp = value
      this.winner = ''
    },
    dayOfMonth(input) {
      const dateParts = input.split('/')
      const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      return dayjs(dateObject).format('Do')
    },
    selectDate(value) {
      this.date = value
    },
    async handleSubmit(event) {
      this.sending = true
      event.preventDefault()
      console.log(`You played ${this.name} on ${this.date}. ${this.winner} was the winner!`)
      const url = `${boardgamesSamApiUrl}/playrecords/create`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders()
      }
      try {
        await axios.post(url, this.dataToSend, axiosConfig)
        this.message = "Successfully stored the new play record."
      }
      catch (error) {
        this.message = error.message
        console.error("Could not post to endpoint", error)
      }
      this.sending = false
    }
  },
  async mounted() {
    const url = `${boardgamesApiUrl}/api/boardgame/list`
    try {
      const { data } = await axios.get(url)
      const { games } = data || []
      this.listOfGames = games.map(entry => entry.name)
    } catch (error) {
      console.log('Unable to load board game list from', url, 'Error:', error.message)
    }
  }
}
</script>

<style scoped>
pre {
  color: white
}
input {
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
  margin: -1.5em 0 0.5em 0;
}
div.row {
  display: flex;
  justify-items: center;
  overflow: hidden;
}
div.row > * {
  text-align: center;
  margin: 0.5em 0.5em 0 0;
}
div.row > input {
  font-weight: bold;
  color: #333;
}
div.option {
  flex: 5 5;
  background: #ddd;
  color: #333;
  border: 2px solid #666;
  border-radius: 0.2em;
  font-weight: bold;
  padding: 0.5em;
  text-align: center;
  transition: background 0.1s ease-out, border 0.1s ease-out;
  white-space: nowrap;
}
div.option:hover {
  background: rgb(187, 229, 255);
  border: 2px solid lightskyblue;
}
div.option.selected {
  background: lightskyblue;
  border: 2px solid navy;
}
label > .icon {
  width: inherit;
}
button {
  background: #ddd;
  color: #333;
  border: 2px solid #666;
  border-radius: 0.2em;
  margin: 0 0.5em;
  font-weight: bold;
  padding: 0.5em;
  text-align: center;
  transition: background 0.1s ease-out, border 0.1s ease-out;
}
button:hover {
  background: rgb(187, 229, 255);
  border: 2px solid lightskyblue;
}
button:active {
  background: lightskyblue;
  border: 2px solid navy;
}
@media (max-width: 719px) {
  div.row {
    flex-wrap: wrap;
  }
  div.row > * {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    flex: 5 5;
  }
  div.row > input {
    min-width: 30%;
    flex: 10 10;
  }
}
</style>