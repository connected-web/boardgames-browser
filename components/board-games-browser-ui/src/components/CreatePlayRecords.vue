<template>
  <div>
    <p>{{ serviceSelection?.message }}</p>

    <form v-on:submit="handleSubmit">
      <h3>What was the name of the game?</h3>
      <p class="default info">(Required Field!)</p>
      <v-select taggable :options="listOfGames" v-model="name" />
      
      <h3>Were any expansions involved?</h3>
      <p class="default info">(Optional: Search or type names of any expansions used)</p>
      <v-select taggable multiple push-tags :options="listOfGames" v-model="expansions" />

      <h3>When was the game played?</h3>
      <p class="default info">(Default: today, Format: dd/mm/yyyy)</p>
      <calendar-picker v-model="date" />

      <h3>Was this game vs. or co-operative?</h3>
      <p class="default info">(Default: vs)</p>
      <div class="row c2">
        <div :class="coOpClass('no')" v-on:click="selectCoop('no')">
          <label for="coOp-no">Vs</label>
        </div>
        <div :class="coOpClass('yes')" v-on:click="selectCoop('yes')">
          <label for="coOp-yes">Co-op</label>
        </div>
      </div>
      
      <h3>{{ coOp === 'yes' ? 'What was the outcome?' : 'Who won?' }}</h3>
      <p class="default info">(Default: draw)</p>
      <div v-if="coOp === 'yes'" class="row c3">
        <div :class="coOpOutcomeClass('win')" v-on:click="coOpOutcome = 'win'">
          <label for="coOp-yes">Co-op Win</label>
        </div>
        <div :class="coOpOutcomeClass('loss')" v-on:click="coOpOutcome = 'loss'">
          <label for="coOp-no">Co-op Loss</label>
        </div>
        <div :class="coOpOutcomeClass('draw')" v-on:click="coOpOutcome = 'draw'">
          <label for="coOp-no">Co-op Draw</label>
        </div>
      </div>
      <div v-else class="row c4">
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
        <input type="text" v-model="noOfPlayers" placeholder="#" class="option" />
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

      <h3>Notes</h3>
      <div style="position: relative; width: 94%;">
        <textarea type="text" v-model="notes" placeholder="Any extra notes about the game..." rows="4" />
      </div>

      <p class="buttons row p10" v-if="sending">
        <button type="reset" disabled>Clear Form</button>
        <button type="submit" disabled>Sending...</button>
      </p>

      <p class="buttons row p10" v-else>
        <button type="reset" v-on:click="clearForm">Clear Form</button>
        <button type="submit">Submit</button>
      </p>
      <p v-if="message">{{message}}</p>
    </form>
    <br />
    <h3>Data preview</h3>
    <pre><code>{{JSON.stringify({ dataToSend }, null, 2)}}</code></pre>
  </div>    
</template>

<script>
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import sharedModel from '../helpers/sharedModel'
import checkServiceSelection from './helpers/checkServiceSelection'

import CalendarPicker from './CalendarPicker.vue'

const { boardgamesApiUrl, boardgamesSamApiUrl } = sharedModel.state

export default {
  components: { vSelect, CalendarPicker },
  data() {
    return {
      name: '',
      expansions: [],
      date: '',
      coOp: '',
      winner: '',
      coOpOutcome: '',
      noOfPlayers: '',
      notes: '',
      message: '',
      listOfGames: [],
      sending: false,
      serviceSelection: 'Not sure...'
    }
  },
  computed: {
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

      if (this.expansions.length > 0) {
        result.expansions = this.expansions
      }

      if (this.notes) {
        result.notes = this.notes
      }
      return result
    }
  },
  methods: {
    checkServiceSelection,
    coOpClass(value) {
      const selected = value === this.coOp
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
      this.coOpOutcome = ''
      this.winner = ''
    },
    async handleSubmit(event) {
      this.sending = true
      event.preventDefault()
      const { dataToSend } = this
      const errors = this.verifyData(dataToSend)
      if (errors && errors.length > 0) {
        this.message = errors.join(' ')
        this.sending = false
        return
      }
      console.log(`You played ${this.name} on ${this.date}. ${this.winner} was the winner!`)
      const url = `${boardgamesSamApiUrl}/playrecords/create`
      const axiosConfig = {
        headers: sharedModel.getAuthHeaders()
      }
      try {
        await axios.post(url, dataToSend, axiosConfig)
        this.message = "Successfully stored the new play record."
      }
      catch (error) {
        this.message = error.message
        console.error("Could not post to endpoint:", error)
      }
      this.sending = false
    },
    clearForm() {
      this.name = ''
      this.expansions = []
      this.date = ''
      this.coOp = ''
      this.winner = ''
      this.coOpOutcome = ''
      this.noOfPlayers = ''
      this.notes = ''
      this.message = ''
      return false
    },
    verifyData(data) {
      const errors = []
      if (!data.name) {
        errors.push('No name field set on data to send.')
      }
      if (/\d{2}\/\d{2}\/\d{4}/.test(data.date) === false) {
        errors.push(`Unexpected date format: "${data.date}" - expected dd/mm/yyyy, e.g. ${this.dateToday}.`)
      }
      return errors
    },
    async loadBoardGamesList() {
      const url = `${boardgamesApiUrl}/api/boardgame/list`
      try {
        const { data } = await axios.get(url)
        const { games } = data || []
        this.listOfGames = games.map(entry => entry.name)
      } catch (error) {
        console.log('Unable to load board game list from', url, 'Error:', error.message)
      }
    }
  },
  async mounted() {
    this.serviceSelection = await this.checkServiceSelection(this.$vueAuth)
    this.loadBoardGamesList()
  }
}
</script>

<style scoped>
input {
  padding: 0.5em;
  font-size: 1em;
}
.buttons {
  text-align: right;
}
.buttons.left {
  text-align: left;
}
.buttons.left > .button:first-of-type {
  margin-left: 0;
}
.default.info {
  color: #99A;
}
div.row {
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  overflow: hidden;
}
div.row > * {
  text-align: center;
  margin: 0.5em 0.5em 0 0;
  flex: 5 5;
}
div.row > input.option {
  font-weight: bold;
  color: #333;
  background: white;
}
textarea {
  display: block;
  width: 100%;
  font-size: 1em;
  font-family: inherit;
  text-align: left;
  padding: 1em;
}
.option {
  display: flex;
  place-content: center;
  place-items: center;
  background: #ddd;
  color: #333;
  border-radius: 0.2em;
  font-weight: bold;
  padding: 0.5em;
  text-align: center;
  transition: background 0.1s ease-out, border 0.1s ease-out;
  white-space: nowrap;
  min-width: 20%;
  max-width: 50%;
  overflow: hidden;
  cursor: pointer;
}
.option > * {
  cursor: pointer;
}
div.option:hover {
  background: rgb(187, 229, 255);
}
div.option.selected {
  background: lightskyblue;
}
label > .icon {
  width: inherit;
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
  .c4 > .option {
    min-width: 45%;
    max-width: 30%;
  }
  .c3 > .option {
    max-width: 30%;
  }
}
@media (max-width: 959px) {
  .c4 > .option {
    min-width: 40%;
    max-width: 50%;
  }
  .c3 > .option {
    max-width: 50%;
  }
}
</style>