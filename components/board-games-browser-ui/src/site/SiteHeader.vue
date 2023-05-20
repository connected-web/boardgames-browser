<template>
  <div class="header">
    <div class="site-logo"></div>
    <label class="site-title">Board Games Browser</label>
    <span class="spacer"></span>
    <button @click="clearData">Reload Data</button>
  </div>
</template>

<script>
import sharedModel from '../helpers/sharedModel'

export default {
  methods: {
    clearData() {
      sharedModel.clearData()
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  gap: 1em;
  height: 4em;
  border-bottom: 2px solid #ddd;
  overflow: hidden;
}
.site-logo {
  display: inline-block;
  background: url(/boardgames-browser/site.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 2em;
  height: 2em;
}
.site-title {
  font-size: 1.4em;
  font-weight: 600;
}
.spacer {
  flex: 1 10;
}

button {
  font-size: 0.85em;
}
</style>