<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12 d-flex justify-content-between pt-2">
        <h1 class="text-light">Tower</h1>
        <div v-if="towerEvent.creatorId == account.id">
          <div>
            <button
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#editEvent"
            >
              Edit Event
            </button>
          </div>
          <button
            class="btn btn-danger"
            v-if="towerEvent.isCanceled == false"
            @click="cancelEvent()"
          >
            Cancel Event
          </button>
          <button v-else>EVENT IS CANCELLED</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 card text-light bg-dark">
        <img
          :src="towerEvent.coverImg"
          alt=""
          class="card-img"
          style="filter: blur(20px)"
          height="300"
        />
        <div class="card-img-overlay textShadow">
          <h3 class="card-title">
            {{ towerEvent.name }}
          </h3>
          <p class="card-text d-flex align-items-stretch">
            {{ towerEvent.description }}
          </p>
          <div v-if="towerEvent.isCanceled == false">
            <button
              v-if="!isAttending"
              class="btn btn-success"
              @click="getTicket()"
            >
              Get Ticket
            </button>
            <button v-else class="btn btn-warning disabled">
              Unattend Event
            </button>
          </div>
          <div v-else><button>Canceled</button></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-1 bg-secondary"
        height="140"
        v-for="a in attendees"
        :key="a.id"
        :title="a.account.name"
      >
        <img :src="a.account.picture" alt="" height="40" class="rounded" />
      </div>
    </div>
    <div class="row bg-dark">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card w-100 mt-3 bg-secondary">
          <div class="card-body">
            <p class="card-title text-end">Join the Conversation</p>
            <form @submit.prevent="createComment()">
              <div>
                <label for="body">Comment:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Comment:"
                  v-model="editable.body"
                  required
                />
              </div>
              <button class="btn btn-success" @click="createComment()">
                <i class="mdi mdi-plus"></i>
              </button>
            </form>
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
  <Modal id="editEvent">
    <template #modal-title> Edit Event</template>
    <template #modal-body>
      <CreateEvent />
    </template>
  </Modal>
</template>


<script>
import { computed, ref, onMounted, nextTick } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { towerEventsService } from '../services/TowerEventsService'
import { attendeesService } from '../services/AttendeesService'
export default {
  setup() {
    const loading = ref(true)
    const route = useRoute()
    onMounted(async () => {
      try {
        await attendeesService.getEventAttendees(route.params.id)
        await towerEventsService.getEventById(route.params.id)
        await commentsService.getComments(route.params.id)
        loading.value = false
      } catch (error) {
        logger.error(error.message)
        Pop.toast(error.message, "error")
      }
    })
    const editable = ref({})
    return {
      towerEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees),
      isAttending: computed(() =>
        AppState.attendees.find(t => t.accountId == AppState.account.id)),
      editable,

      async createComment() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.createComment(editable.value)
          editable.value = {}
          Pop.toast('Comment Created')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },
      async getTicket() {
        try {
          await attendeesService.createAttendee({ eventId: route.params.id })
          Pop.toast('Success')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },
      async cancelEvent() {
        try {
          await towerEventsService.removeTowerEvent(route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.textShadow {
  text-shadow: #000 1px 0 10px;
}
</style>