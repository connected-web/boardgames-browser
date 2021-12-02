<template>
  <div>
    <p>Hi</p>

    <form onSubmit={this.handleSubmit}>
          <label>
            Title
            <input 
            type="text"
            v-model="title"
            />
          </label>
          <br />
          <label>
            Date
            <input 
            type="text"
            v-model="date" />
          </label>
          <br />
          <label>
            Co-op
            <input 
            type="text" 
            v-model="coop" />
          </label>
          <br />
          <label>
            Winner
            <input 
            type="text"
            v-model="winner" />
          </label>
          <br />
          <label>
            Number of Players
            <input 
            type="text"
            v-model="noOfPlayers" />
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <b>Data preview</b>
        <pre>{{JSON.stringify({ title, date, coop, winner, noOfPlayers }, null, 2)}}</pre>
      </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello Hannah',
      date: '',
      coop: '',
      winner: '',
      noOfPlayers: ''
    }
  },
  methods: {
    handleInputChange(ev) {
      console.log("Input changed!", ev)
    }
  }
}
</script>

<style scoped>
 pre{
   color: white
 }
</style>