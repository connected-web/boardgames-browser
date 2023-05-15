<template>
  <div class="authenticate">
    <h1>Authenticate with API</h1>
    <AuthoriseUser />
  </div>
</template>

<script>
import AuthoriseUser from '../components/AuthoriseUser.vue'

export default {
  components: { AuthoriseUser }
}
</script>