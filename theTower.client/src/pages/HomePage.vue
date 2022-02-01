<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between p-3">
      <h1 class="text-light">Tower</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card bg-dark text-white p-3">
        <img
          src="https://th.bing.com/th/id/OIP.A79oMqjZkGecXPE1tUmnxQHaEK?pid=ImgDet&rs=1"
          class="card-img"
          style="filter: blur(8px)"
          alt="..."
          height="200"
        />
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 bg-secondary mt-3">
        <span class="d-flex justify-content-between p-3">
          <h4 class="selectable">All</h4>
          <h4 class="selectable">Concert</h4>
          <h4 class="selectable">Convention</h4>
          <h4 class="selectable">Sports</h4>
          <h4 class="selectable">Digital</h4>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 mt-3" v-for="t in towerEvents" :key="t.id">
        <TowerEvent :towerEvent="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    const loading = ref(true)
    onMounted(async () => {
      try {
        await towerEventsService.getAllEvents()
        loading.value = false
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'Error')
      }
    })

    return {
      towerEvents: computed(() => AppState.towerEvents),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
}
</style>
