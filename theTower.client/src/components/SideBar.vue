<template>
  <div class="col-10 bg-dark sidebar">
    <ul>
      <li>
        <router-link
          class="d-flex justify-content-center selectable"
          :to="{ name: 'Home' }"
        >
          <div class="d-flex flex-column align-items-center p-3">
            <h5 class="text-light rounded">Home</h5>
          </div>
        </router-link>
      </li>
      <li>
        <button
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#createEvent"
          v-if="account.id"
        >
          <p>Create Event <i class="mdi mdi-plus"></i></p>
        </button>
      </li>
      <li>
        <router-link
          class="d-flex justify-content-center selectable"
          :to="{ name: 'Account' }"
        >
          <div class="d-flex flex-column align-items-center p-3">
            <h5 class="text-light rounded">Account</h5>
          </div>
        </router-link>
      </li>
      <li v-if="!user.isAuthenticated">
        <button
          class="btn btn-success selectable text-dark lighten-30"
          @click="login()"
        >
          Login
        </button>
      </li>
      <li v-else>
        <div class="dropdown my-2 my-lg-0">
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
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout()"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <Modal id="createEvent">
    <template #modal-title> Create Event</template>
    <template #modal-body>
      <CreateEvent />
    </template>
  </Modal>
</template>


<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      towerEvents: computed(() => AppState.towerEvents),
      account: computed(() => AppState.account),
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