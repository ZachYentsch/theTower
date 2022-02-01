<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-10">
        <router-view />
      </div>
      <div class="col-2">
        <SideBar />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import SideBar from './components/SideBar.vue'
export default {
  components: { SideBar },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
