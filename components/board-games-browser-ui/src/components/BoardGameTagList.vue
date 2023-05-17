<template>
  <div class="boardgame-list">
    <LoadingSpinner v-if="loading">Loading tag list...</LoadingSpinner>
    <div v-for="(tagGroup, tagKey) in tags" :key="`div_tag_${tagKey}`">
      <h2 :id="`${tagKey}`">By {{ tagKey }}</h2>
      <ul>
        <li v-for="value in tagGroup" :key="`li_value_${value}`">
          <router-link :to="boardgameTagLink(tagKey, value)">{{ value }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import modelCache from '../helpers/modelCache'
import sharedModel from '../helpers/sharedModel'

import LoadingSpinner from './LoadingSpinner.vue'

const { boardgamesApiUrl } = sharedModel.state 

export default {
  components: { LoadingSpinner },
  data () {
    return {
      games: [],
      tags: [],
      loading: false
    }
  },
  async beforeMount() {
    this.loading = true
    this.tags = await loadBoardGameTagsList(this)
    this.loading = false
  },
  methods: {
    boardgameTagLink(tag, value) {
      return `/games/by-tag/${tag}/${value}`
    }
  }
}

async function loadBoardGameTagsList() {
  let tags
  try {
    const data = await modelCache.get(`${boardgamesApiUrl}/api/boardgame/tags/list`)
    tags = data.boardGameTags
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