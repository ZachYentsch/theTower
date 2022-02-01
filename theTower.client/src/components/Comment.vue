<template>
  <div class="row">
    <div class="col-4">
      <img :src="user.picture" alt="" height="30" class="rounded" />
      <p>{{ user.name }}</p>
    </div>
    <div class="bg-dark col-8">
      <p>{{ comment.body }}</p>
    </div>
    <i class="mdi mdi-trash-can selectable" @click="removeComment()"></i>
  </div>
</template>


<script>
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      user: computed(() => AppState.user),
      activeEvent: computed(() => AppState.activeEvent),
      async removeComment() {
        try {
          await commentsService.removeComment(props.comment.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>