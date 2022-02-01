<template>
  <div class="col-12 bg-dark sidebar">
    <ul>
      <li>
    <router-link
      class="d-flex justify-content-center selectable"
      :to="{ name: 'Home' }"
    >
      <div class="d-flex flex-column align-items-center p-3">
        <h3 class="text-light rounded">Home</h3>
      </div>
    </router-link>
</template>


<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.sidebar {
  height: 100vh;
}
</style>