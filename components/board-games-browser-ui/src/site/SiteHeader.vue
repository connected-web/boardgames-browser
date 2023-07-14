<template>
  <div class="header">
    <div class="site-logo"></div>
    <label class="site-title">Board Games Browser</label>
    <span class="spacer"></span>
    <div class="row p10">
      <button @click="clearData">
        <span>Reload Data</span>
        <div class="circle-icon">
          <Icon icon="recycle" />
        </div>
      </button>
      <AuthButton />
    </div>
  </div>
</template>

<script>
import sharedModel from '../helpers/sharedModel'

import AuthButton from '../login/AuthButton.vue'

export default {
  components: { AuthButton },
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
  text-transform: uppercase;
  letter-spacing: 2px;
  white-space: nowrap;
}
</style>