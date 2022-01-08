<template>
  <div class="day-box" :title="`Day: ${offset}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default() {
        return new Date()
      }
    }
  }
}
</script>

<style scoped>
.day-box {
  display: inline-block;
  background: #f5f5f5;
  margin: 0.1em;
  padding: 0.2em;
  width: 1.5em;
  text-align: center;
  transition: background 0.1 ease-in;
}
.day-box:hover {
  background: #f0f0f0;
}
</style>