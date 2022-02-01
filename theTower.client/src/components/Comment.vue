<template>
  <div class="row">
    <ul>
      <li>
        <div class="col-3">
          <img :src="comments.creator.Img" alt="" />
        </div>
        <div class="col-9 bg-dark">
          <p>{{ comments.body }}</p>
        </div>
        <i class="mdi mdi-trash selectable" @click="removeComment()"></i>
      </li>
    </ul>
  </div>
</template>


<script>
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    comments: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async removeComment() {
        try {
          await commentsService.removeComment(props.comments.id, route.params.id)
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