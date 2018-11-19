<template>
      <div>
        <div class="card mr-3 mb-3" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">{{ article.description }}</p>
                <router-link :to="'/'+article._id">
                  <p class="btn btn-info">more</p>
                </router-link>
                <p class="btn btn-warning mx-1" data-toggle="modal" data-target="" @click="updateArticle(article._id)">update</p>
                <p class="btn btn-danger" @click="deleteArticle(article._id)">delete</p> 
              </div>
        </div>
      </div>
</template>

<script>
export default {
    props: ['article'],
    methods: {
      deleteArticle(id){
        this.$emit('deleteArticle', id)
      },
      updateArticle(id) {
        this.$emit('updateArticle', id)
      }
    },
}
</script>

