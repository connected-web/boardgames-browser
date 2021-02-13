<template>
  <BoardgameSummary v-if="gameId" :gameId="gameId" />
  <BoardgameList v-else />
</template>

<script>
export default {
  data: function () {
    return {
      gameId: false,
    }
  },
  async beforeMount() { 
    const params = getParamsFromUrl(document.location)
    const { game } = params
    this.$data.gameId = game
    console.log('Params', params)
  }
}

function getParamsFromUrl(url) {
  const decodedUrl = decodeURI(url)
  if (typeof decodedUrl === 'string') {
    let paramStr = (decodedUrl.split('?')[1] || '').split('#')[0]
    let pairs = paramStr.split('&').map(kvp => kvp.split('='))
    let params = pairs.reduce((acc, [key, value]) => {
      if (key) {
        acc[key] = value
      }
      return acc
    }, {})
    return params
  }
}
</script>