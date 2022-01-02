<template>
  <div class="boardgame-list">
    <p v-if="message">{{message}}</p>
    <ul>
      <li v-for="(item, key) in $data.tags" :key="`li_tag_${key}`"><a :href="`#${key}`">{{ key }}</a></li>
    </ul>
    <div v-for="(tagGroup, tagKey) in $data.tags" :key="`div_tag_${tagKey}`">
      <h2 :id="`${tagKey}`">By {{ tagKey }}</h2>
      <ul>
        <li v-for="value in tagGroup" :key="`li_value_${value}`"><a :href="boardgameTagLink(tagKey, value)">{{ value }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'

const { boardgamesApiUrl } = sharedModel.state 

export default {
  data: function () {
    return {
      message: `Loading data from ${boardgamesApiUrl}`,
      games: [],
      tags: [],
      messasge: ''
    }
  },
  async beforeMount() { 
    this.$data.tags = await loadBoardGameTagsList(this)
    this.$data.message = `${Object.keys(this.$data.tags).length} tags in list:`
  },
  methods: {
    boardgameTagLink(tag, value) {
      return `/boardgames-browser/tags/?tag=${tag}&value=${value}`
    }
  }
}

async function loadBoardGameTagsList() {
  let tags
  try {
    const response = await axios.get(`${boardgamesApiUrl}/api/boardgame/tags/list`)
    tags = response.data.boardGameTags
  } catch (error) {
    console.log('Load Board Game List:', error);
  }
  return tags
}
</script>

<style scoped>
.boardgame-list {
  border-top: 2px solid #EEE;
}
</style>