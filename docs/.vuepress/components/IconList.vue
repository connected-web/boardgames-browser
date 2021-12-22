<template>
  <div class="icon list">
    <div>
      <input v-model="iconFilter" placeholder="Filter icon by name..." />
    </div>
    <icon v-for="icon in filteredIcons" :key="icon" :icon="icon" />
  </div>
</template>

<script>
import icons from './src/icons'

export default {
  data() {
    return {
      iconFilter: '',
      icons: icons()
    }
  },
  computed: {
    filteredIcons() {
      const { iconFilter, icons } = this
      return iconFilter ? icons.filter(icon => icon.includes(iconFilter) || iconFilter.includes(icon)) : icons   
    }
  }
}
</script>