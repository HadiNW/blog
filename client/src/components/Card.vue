<template>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <router-link :to="'/aa/'+ article._id">
             <p class="btn btn-primary">See Detail</p>
        </router-link>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['article']
}
</script>

