<template>
  <div class="header">
    <div v-if="screenSize?.value === 'small'" class="burger" @click="$emit('toggleNav')">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="site-logo"></div>
    <label class="site-title">
      <span class="fulltext">Board Games Browser</span>
      <span class="initials">BGB</span>
    </label>
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
import { inject } from 'vue'
import sharedModel from '../helpers/sharedModel'
import AuthButton from '../login/AuthButton.vue'

export default {
  components: { AuthButton },
  emits: ['toggleNav'],
  setup() {
    const screenSize = inject('screenSize')
    return {
      screenSize
    }
  },
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

.burger {
  display: block;
  width: 24px;
  height: 20px;
  cursor: pointer;
}

.burger span {
  display: block;
  height: 2px;
  background-color: #aaa;
  margin-bottom: 6px;
}
.site-logo {
  display: inline-block;
  background: url(/boardgames-browser/site.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 2em;
  height: 2em;
  min-width: 2em;
}
.site-title {
  font-size: 1.4em;
  font-weight: 600;
}
.spacer {
  flex: 1 10;
}

button {
  font-size: 12px;
}

@media only screen and (max-width: 640px) {
  button > span {
    display: none;
  }
}

</style>