<template>
  <div class="grid key">
    <b>Key:</b>
    <div class="horizontal items">
      <game-stat-key-box symbol="j" label="John" />
      <game-stat-key-box symbol="h" label="Hannah" />
      <game-stat-key-box symbol="o" label="Other" />
      <game-stat-key-box symbol="d" label="Draw" />
      <game-stat-key-box symbol="w" label="Co-op: Win" />
      <game-stat-key-box symbol="l" label="Co-op: Lose" />
    </div>
  </div>
</template>

<style scoped>
.grid.key {
  display: block;
  background: #F5F5F5;
  margin: 2px;
  padding: 4px;
}
.grid.key > b {
  font-size: 0.8em;
}
.horizontal.items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.horizontal.items > * {
  margin: 5px;
}
</style>