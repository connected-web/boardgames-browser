<template>
  <div class="header">
    <div class="site-logo"></div>
    <label class="site-title">Board Games Browser</label>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1em;
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
</style>