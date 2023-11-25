<template>
  <div>
    <p class="auth-info">{{ serviceSelection?.message }}</p>

    <div v-if="!gameId">
      <p class="breadcrumbs">
        <router-link :to="`/api/tag`">Tag Games</router-link>
        /
        <span>Index</span>
      </p>
      <h2>Select a game</h2>
      <v-select taggable :options="listOfGames" v-model="name" />
    </div>

    <div v-else-if="gameRecordNotFound">
      <p class="breadcrumbs">
        <router-link :to="`/api/tag`">Tag Games</router-link>
        /
        <span>Index</span>
      </p>
      <h2>Game not found</h2>
      <p>Could not find a game with the ID {{ gameId }}.</p>
    </div>

    <div v-else>
      <p class="breadcrumbs">
        <router-link :to="`/api/tag`">Tag Games</router-link>
        /
        <router-link :to="`/api/tag/${gameId}`">{{ gameName }}</router-link>
      </p>
      <h2>{{ gameName }}</h2>

      
      <stat-value label="Board Game Geek Name">{{ game.boardGameGeekName }}</stat-value>
      <stat-value label="Board Game API ID">{{ game.boardGameApiId }}</stat-value>
      <hr />

      <h3>Play Summary</h3>
      <div class="play summary">
        <stat-value label="Total Games Played">{{ game.totalGamesPlayed }}</stat-value>
        <p>
          <game-stat-box v-for="(playRecord, index) in game.playRecords" :game="playRecord" :name="game.name" :key="`gameStat_${playRecord.date}_${index}`" />
        </p>
        <game-stat-key />
      </div>

      <p v-if="serviceSelection.authed === false">To modify game records, you need to be logged in.</p>
      <form v-else-if="serviceSelection.authed" v-on:submit="handleSubmit">
        
        <p v-if="message">{{message}}</p>
        
        <br />
        <h3>Data preview</h3>
        <pre><code>{{JSON.stringify({ dataToSend }, null, 2)}}</code></pre>
      </form>
    </div>
  </div>    
</template>

<script>
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import sharedModel from '../helpers/sharedModel'
import checkServiceSelection from './helpers/checkServiceSelection'

import BoardGamesAPIClient from '../clients/BoardGamesAPIClient'

import CalendarPicker from './CalendarPicker.vue'
import GameStatBox from './GameStatBox.vue'
import StatValue from './StatValue.vue'
import clone from '../helpers/clone'

const { boardgamesApiUrl, boardgamesSamApiUrl } = sharedModel.state

export default {
  components: { vSelect, CalendarPicker, GameStatBox, StatValue },
  props: {
    gameId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      message: '',
      game: {},
      gameRecordNotFound: false,
      games: [],
      listOfGames: [],
      sending: false,
      serviceSelection: 'Not sure...'
    }
  },
  computed: {
    gameName() {
      return this.games?.find(game => game.boardGameApiId === this.gameId)?.name ?? this.gameId
    },
    dataToSend() {
      const result = {
        name: this.name
      }

      return result
    }
  },
  methods: {
    checkServiceSelection,
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
      try {
        const response = await (this.serviceSelection?.service === 'OAuth' ? this.createPlayRecordOnCDKAPI(dataToSend) : this.createPlayRecordOnSAMAPI(dataToSend))
        const fileKey = response?.data?.keypath
        this.message = `Successfully stored the new play record: ${fileKey}`
      } catch (error) {
        this.message = `Could not save playrecord: ${error.message}`
        console.error("Could not save playrecord:", error)
      }
      this.sending = false
    },
    async updateGameRecord(dataToSend) {
      const client = await BoardGamesAPIClient.getSingleton().getInstance()
      return await client.updateGameRecord(null, dataToSend)
    },
    clearForm() {
      return false
    },
    verifyData(data) {
      const errors = []
      if (!data.name) {
        errors.push('No name field set on data to send.')
      }
      return errors
    },
    async loadBoardGamesList() {
      const url = `${boardgamesApiUrl}/api/boardgame/list`
      try {
        const { data } = await axios.get(url)
        const { games } = data || []
        this.games = clone(games)
        this.listOfGames = games.map(entry => entry.name)
        console.log('Games', { games })
      } catch (error) {
        console.log('Unable to load board game list from', url, 'Error:', error.message)
      }
    },
    async loadBoardGameInfo() {
      const url = `${boardgamesApiUrl}/api/boardgame/by/${this.gameId}`
      try {
        const { data } = await axios.get(url)
        const { game } = data || {}
        this.game = clone(game)
        console.log('Game', { game })
        this.gameRecordNotFound = false
      } catch (error) {
        console.log('Unable to load board game info from', url, 'Error:', error.message)
        this.gameRecordNotFound = true
      }
    }
  },
  async mounted() {
    this.serviceSelection = await this.checkServiceSelection(this.$vueAuth)
    this.loadBoardGamesList()
    const { gameId } = this
    if (gameId) {
      this.loadBoardGameInfo(gameId)
    }
  },
  watch: {
    name: function (newName) {
      const game = this.games.find(game => game.name === newName)
      if (game) {
        this.$router.push({ path: `/api/tag/${game.boardGameApiId}` })
      }
    },
    gameId: function (newGameId) {
      if (!newGameId) {
        return
      }
      this.loadBoardGameInfo(newGameId)
    }
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