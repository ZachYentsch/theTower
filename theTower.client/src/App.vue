<template>
  <main class="container-fluid bg-dark">
    <div class="row">
      <div class="col-10">
        <router-view />
      </div>
      <div class="col-md-2">
        <Sidebar />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
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
.sidebar {
  height: 100vh;
}
</style>
