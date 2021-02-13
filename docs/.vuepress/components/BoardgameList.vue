<template>
<div class="boardgame-list">
  <p>{{message}}</p>
  <ul>
    <li v-for="item in items">{{ item.first_name }} {{ item.last_name }}</li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: 'Gotta start somewhere!',
      items: []
    }
  },
  beforeMount() {
    axios.get('https://reqres.in/api/users')
    .then(response => {
       this.$data.items = response.data.data
    })
    .catch(error => {
        console.log(error);
    })
  }
}
</script>

<style scoped>
.boardgame-list {
  border-top: 8px solid #EEE;
}
</style>