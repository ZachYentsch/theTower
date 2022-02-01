<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">Tower</h1>
      </div>
    </div>
    <div class="col-12">
      <img
        :src="activeEvent.coverImg"
        alt=""
        class="card-img"
        style="filter: blur(8px)"
        height="200"
      />
      <div class="">
        <div class="d-flex">
          <h3>
            {{ activeEvent.name }}
          </h3>
          <p>{{ activeEvent.description }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 bg-secondary" height="140">
        {{ attendee.picture }}
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
</template>


<script>
import { computed, ref, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
export default {
  setup() {
    const loading = ref(true)
    const route = useRoute()
    onMounted(async () => {
      try {
        await commentsService.getComments(route.params.id)
        loading.value = false
      } catch (error) {
        logger.error(error.message)
        Pop.toast(error.message, 'Error')
      }
    })
    const editable = ref({})
    return {
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      attendee: computed(() => AppState.attendee),
      editable,
      async createComment() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.createComment(editable.value)
          editable.value = {}
          Pop.toast('Comment Created')
        } catch (error) {
          Pop.toast(error.message, 'Error')
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>