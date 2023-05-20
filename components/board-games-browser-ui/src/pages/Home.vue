<template>
  <div class="home page">
    <h1>Home</h1>
    <p>Welcome to the boardgames browser!</p>

    <h2>Things to see</h2>
    <ul>
      <li><router-link to="/games/by-name">An index of boardgames</router-link></li>
      <li><router-link to="/stats/grids/">Games organised by challenge grids</router-link></li>
      <li><router-link to="/games/by-tag">Games organised by tags</router-link></li>
    </ul>

    <h2>Things to do</h2>
    <ul>
      <li><router-link to="/api/track">Track board game</router-link></li>
      <li><router-link to="/api/review">Review play records</router-link></li>
      <li><a href="https://github.com/connected-web/boardgames-browser/actions">Rebuild the stats &rarr;</a></li>
    </ul>

    <h2>About</h2>
    <p>This is boardgames browser is for personalized boardgame data, sourced from <b>boardgames-api.calisaurus.net</b> for Hannah and John.</p>

    <h2>Source code</h2>
    <ul>
      <li>Website and UI, Vue JS and Vite
        <ul><li><a href="https://github.com/connected-web/boardgames-browser">connected-web/boardgames-browser &rarr;</a></li></ul>
      </li>
      <li>Boardgames API, JavaScript and PHP
        <ul><li><a href="https://github.com/connected-web/boardgames-api">connected-web/boardgames-api &rarr;</a></li></ul>
      </li>
      <li>Boardgames SAM API - AWS Serverless Application Model
        <ul><li><a href="https://github.com/connected-web/boardgames-sam-api">connected-web/boardgames-sam-api &rarr;</a></li></ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>