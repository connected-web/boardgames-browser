<template>
  <div class="header">
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

.fulltext {
  display: inline;
}
.initials {
  display: none;
}

@media only screen and (max-width: 640px) {
  button > span {
    display: none;
  }
}
@media only screen and (max-width: 480px) {
  .site-title {
    font-size: 1.4em;
    font-weight: 600;
  }
  .fulltext {
    display: none;
  }
  .initials {
    display: inline;
  }
}
</style>