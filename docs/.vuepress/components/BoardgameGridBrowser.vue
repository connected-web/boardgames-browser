<template>
  <BoardgameGrid v-if="$data.dateCode" :dateCode="$data.dateCode" />
  <BoardgameGridList v-else />
</template>

<script>
export default {
  name: 'BoardgameGrids',
  data: function () {
    return {
      dateCode: false,
    }
  },
  async beforeMount() { 
    const params = getParamsFromUrl(document.location)
    const { dateCode } = params
    this.$data.dateCode = dateCode
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