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
          <h5 class="card-title">Get Your Tickets Now!</h5>
          <p class="card-text">Go where your daily routine can't.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 bg-secondary mt-3">
        <span class="d-flex justify-content-between p-3">
          <h4 class="selectable" @click="getAllEvents()">All</h4>
          <h4 class="selectable" @click="getConcert()">Concert</h4>
          <h4 class="selectable" @click="getConvention()">Convention</h4>
          <h4 class="selectable" @click="getSport()">Sports</h4>
          <h4 class="selectable" @click="getDigital()">Digital</h4>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mt-3" v-for="t in filteredEvents" :key="t.id">
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
import { TowerEvent } from '../models/TowerEvent'
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
      filteredEvents: computed(() => AppState.filteredEvents),
      account: computed(() => AppState.account),
      async getAllEvents() {
        try {
          await towerEventsService.getAllEvents()
        } catch (error) {
          logger.log(error.message)
          Pop.toast(error.message, 'Error')
        }
      },

      async getConcert() {
        const concerts = AppState.towerEvents.filter((t) => t.type == 'concert')
        console.log(concerts)
        AppState.filteredEvents = concerts
      },

      async getConvention() {
        const convention = AppState.towerEvents.filter((t) => t.type == 'convention')
        console.log(convention)
        AppState.filteredEvents = convention
      },

      async getSport() {
        const sport = AppState.towerEvents.filter((t) => t.type == 'sport')
        logger.log(sport)
        AppState.filteredEvents = sport
      },

      async getDigital() {
        const digital = AppState.towerEvents.filter((t) => t.type == 'digital')
        logger.log(digital)
        AppState.filteredEvents = digital
      },
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
