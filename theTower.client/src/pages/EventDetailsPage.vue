<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">Tower</h1>
      </div>
    </div>
    <div class="col-12">
      <img
        :src="towerEvent.coverImg"
        alt=""
        class="card-img"
        style="filter: blur(8px)"
        height="200"
      />
      <div class="card-img-overlay">
        <div class="d-flex">
          <h3>
            {{ towerEvent.name }}
          </h3>
          <p>{{ towerEvent.description }}</p>
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
            <form>
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
            <!-- <div class="">
              <ul>
                <li>

                </li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      towerEvents: computed(() => AppState.towerEvents),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      attendee: computed(() => AppState.attendee),
      editable,
      async createComment() {
        try {
          await commentsService.createComment(editable.value, route.params.id, props.comments.id)
          editable.value = {}
          Pop.toast('Comment Created')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>