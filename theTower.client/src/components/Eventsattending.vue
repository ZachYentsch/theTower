<template>
  <div class="details mt-3">
    <div class="card bg-dark text-white">
      <img
        :src="towerEvent.coverImg"
        class="card-img"
        alt="Event Image"
        height="200"
      />
      <div class="card-img-overlay">
        <h5 class="card-title">{{ towerEvent.name }}</h5>
        <h6 class="card-body m-1 p-0">{{ towerEvent.startDate }}</h6>
        <h6 class="card-body m-1 p-0">{{ towerEvent.location }}</h6>
        <button class="card-body btn btn-danger" @click="submitTicket()">
          Stop Going
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { attendeesService } from '../services/AttendeesService'
import Pop from '../utils/Pop'
export default {
  props: {
    towerEvent: { type: Object, required: true },
    attendee: { type: Object, required: true }
  },
  setup(props) {
    return {
      async submitTicket() {
        try {

          await attendeesService.removeAttendee(props.attendee.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>