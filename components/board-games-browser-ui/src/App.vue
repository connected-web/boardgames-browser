<template>
  <div class="app">
    <SiteHeader />
    <div class="middle">
      <SideNavigation />
      <router-view class="page" />
    </div>
  </div>
</template>

<script>
import SideNavigation from './components/SideNavigation.vue'
import SiteHeader from './components/SiteHeader.vue'

export default {
  components: { SiteHeader, SideNavigation }
}
</script>

<style scoped>
.app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.middle {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1 1;
}
.page {
  margin: 0;
  padding: 1em 2em;
}
</style>
