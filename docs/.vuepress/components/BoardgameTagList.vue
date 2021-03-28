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
    boardgameTagLink(tag, value) {
      return `/boardgames-browser/tags/byValue/?tag=${tag}&value=${value}`
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