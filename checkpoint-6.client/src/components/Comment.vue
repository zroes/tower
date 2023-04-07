<template class="">
  <div class="row justify-content-center mb-3">

    <div class="col-2">
      <img class="profile-img elevation-2" :src="comment.creator.picture" alt="">
    </div>
    <div class="col-5 bg-light rounded elevation-2 me-6" :class="comment.creatorId == account?.id ? 'parent' : ''">
      <h6 class="pt-2 m-0"> {{ comment.creator.name }}</h6>
      <div class="py-2 px-4">
        <p class="m-0">{{ comment.body }}</p>
      </div>
      <div class="text-end mb-1">
        <button @click="deleteComment()" :disabled="comment.creatorId != account?.id"
          class="child btn btn-danger p-0 px-1" title="Delete">
          <i class="mdi mdi-delete"></i></button>
      </div>
    </div>
  </div>
</template>

<script>

import { computed } from "vue"
import { Comment } from "../models/Comment.js"
import { commentsService } from "../services/CommentsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup(props) {
    // private variables and methods here
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          const commentId = props.comment.id
          if (await Pop.confirm('Are you sure you want to delete this comment?'))
            await commentsService.deleteComment(commentId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
      // public variables and methods here
    }
  },
}
</script>

<style scoped>
.profile-img {
  margin-left: 3.2em;
  max-height: 10vh;
  border-radius: 40%;
}

.me-6 {
  margin-right: 6em;
}

.child {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  /* background-color: #dc3545;
  color: #f7f5f5; */
}

.parent:hover .child {
  opacity: 100;

}
</style>