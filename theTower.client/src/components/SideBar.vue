<template>
  <div class="col-12 bg-dark sidebar">
    <router-link
      class="d-flex justify-content-center selectable"
      :to="{ name: 'Home' }"
    >
      <div class="d-flex flex-column align-items-center p-3">
        <h3 class="text-light">Home</h3>
      </div>
    </router-link>
  </div>
  <div class="col-12">
    <button
      class="btn btn-success selectable lighten-20 text-uppercase"
      @click="login()"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>
    <div class="dropdown my-2 my-lg-0" v-else>
      <div
        class="dropdown-menu p-0 list-group w-100"
        aria-labelledby="authDropdown"
      >
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </div>
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