<template>
     <div class="media mb-4 mt-4">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
              <h5 class="mt-0">{{ comment.user.name }}</h5>
                    {{comment.comment}}
            </div>
                <p v-if="comment.user.name === user" class="btn btn-sm btn-secondary" @click="deleteComment(comment._id)">Delete</p>   
          </div>
</template>

<script>
export default {
    props: ['comment'],
    data() {
      return {
        user: localStorage.getItem('user')
      }
    },
    methods: {
      deleteComment(id) {
        this.$emit('deleteComment', id)
      }
    }
}
</script>


