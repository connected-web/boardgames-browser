<template>
  <BoardgameTag v-if="$data.tag && $data.value" :tag="$data.tag" :value="$data.value" />
  <BoardgameTagList v-else />
</template>

<script>
export default {
  name: 'BoardgameTags',
  data: function () {
    return {
      dateCode: false,
    }
  },
  async beforeMount() { 
    const params = getParamsFromUrl(document.location)
    const { tag, value } = params
    this.$data.tag = tag
    this.$data.value = value
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