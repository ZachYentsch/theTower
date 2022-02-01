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
    <span class="text-light">
      <button
        class="
          btn
          selectable
          text-success
          lighten-30
          text-uppercase
          my-2 my-lg-0
        "
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
            @click="logout()"
          >
            <i class="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </span>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
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