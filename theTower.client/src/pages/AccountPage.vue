<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">Tower</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="text-success mt-3">Upcoming Events</h4>
      </div>
      <div class="col-12" v-for="m in myEvents" :key="m.id">
        <Eventsattending :towerEvent="m.event" :attendee="m" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
export default {
  name: 'Account',
  setup() {
    const loading = ref(true)
    onMounted(async () => {
      try {
        await towerEventsService.getMyEvents()
        loading.value = false
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'Error')
      }
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myTowerEvents)

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
