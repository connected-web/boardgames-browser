<template>
<div class="boardgame-list">
  <p v-if="message">{{message}}</p>
  <ul>
    <li v-for="(item, key) in $data.tags" :key="`li_tag_${key}`">{{ key }}</li>
  </ul>
  <div v-for="(item, key) in $data.tags" :key="`div_tag_${key}`">
    <h2>By {{ key }}</h2>
    <ul>
      <li v-for="(item, key) in item" :key="`li_value_${item}`">{{ item }}</li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const boardgamesApiUrl = 'https://boardgames-api.calisaurus.net'

export default {
  name: 'BoardgameTagList',
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      games: []
    }
  },
  async beforeMount() { 
    this.$data.tags = await loadBoardgameTagsList(this)
    this.$data.message = `${Object.keys(this.$data.tags).length} tags in list:`
  },
  methods: {
    boardgameTagLink(game) {
      return `/boardgames-browser/tags/?tag=${tag}&value=${value}`
    }
  }
}

async function loadBoardgameTagsList() {
  let tags
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/tags/list`)
    tags = response.data.boardGameTags
  } catch (error) {
    console.log('Load Boardgame List:', error);
  }
  return tags
}
</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>