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
  margin: 0;
  padding: 3px;
  width: 1.5em;
  text-align: center;
  transition: background 100ms ease-in, border 150ms ease-in;
  border: 2px solid white;
  cursor: pointer;
}
.day-box:hover {
  background: #f0f0f0;
  border: 2px solid #aaa;
}
.offset-0 {
  color: #666;
}
.val-undefined {
  background: #ddd;
  color: #ddd;
  cursor: default;
}
.val-undefined:hover {
  background: #ddd;
  border: 2px solid white;
}
.val-0 {
  color: #999;
}
.val-1 {
  background: #9A9;
}
.val-2 {
  background: #9B9;
}
.val-3 {
  background: #9C9;
}
.val-4 {
  background: #9D9;
}
.val-5 {
  background: #9E9;
}
.val-6 {
  background: #9F9;
}
.val-7 {
  background: #8F8;
}
.val-8 {
  background: #7F7;
}
.val-9 {
  background: #6F6;
}
.val-10 {
  background: #5F5;
}
</style>