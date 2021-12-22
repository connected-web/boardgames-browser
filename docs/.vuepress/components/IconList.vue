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
      iconFilter: 'ice',
      icons: icons()
    }
  },
  computed: {
    filteredIcons() {
      const { iconFilter, icons } = this
      const filter = iconFilter.toLowerCase()
      return iconFilter ? icons.filter(icon => icon.includes(filter) || filter.includes(icon)) : icons   
    }
  }
}
</script>