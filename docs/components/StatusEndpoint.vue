<template>
  <div>
    <p>Status check for: {{ statusUrl }}</p>
    <pre><code>{{ status }}</code></pre>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import sharedModel from './src/sharedModel'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sharedModel,
      status: false,
      message: ''
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get(this.statusUrl)
      this.status = data
    } catch (ex) {
      this.message = `Unable to load status: ${ex.message}`
    }
  },
  computed: {
    statusUrl() {
      return sharedModel.state[this.url] || this.url
    }
  }
}
</script>