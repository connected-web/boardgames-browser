<template>
  <div class="stat">
    <label>{{ label }}</label>
    <span class="value">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StatValue',
  props: ['label']
}
</script>

<style scoped>
div.stat {
  display: flex;
  flex-wrap: wrap;
  margin: 0.2em 0;
  background: #f5f5f5;
}
div.stat > label {
  flex: 2 4;
  white-space: nowrap;
  padding: 0.3em 0.3em;
}
div.stat > span.value {
  flex: 2 4;
  text-align: right;
  font-weight: bold;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
}
</style>