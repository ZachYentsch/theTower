<template>
  <main class="container-fluid bg-dark">
    <div class="row">
      <div class="col-10">
        <router-view />
      </div>
      <div class="col-2">
        <SideBar />
      </div>
    </div>
  </main>
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
