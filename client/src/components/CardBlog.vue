<template>
      <div class="post col-xl-6">
                <div class="post-thumbnail"><img src="https://images.pexels.com/photos/702123/pexels-photo-702123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" class="img-fluid"></div>
                <div class="post-details">
                  <div class="post-meta d-flex justify-content-between">
                    <div class="date meta-last">{{ article.createdAt}}</div>
                  </div>
                    <router-link :to="'/articles/' + article._id">
                        <h3 class="h4">{{ article.title }}</h3>
                    </router-link>  
                    <p class="text-muted">{{ article.description }}</p>                                   
                  <footer class="post-footer d-flex align-items-center"><a href="#" class="author d-flex align-items-center flex-wrap">
                      <!-- <div class="avatar"><img src="img/avatar-3.jpg" alt="..." class="img-fluid"></div> -->
                      <div class="title"><span>{{ article.author.name }}</span></div></a>
                    <div class="date"><i class="icon-clock"></i> 2 months ago</div>
                    <div class="comments meta-last"><i class="icon-comment"></i>12</div>
                  </footer>
                </div>
        </div>
</template>

<script>
export default {
    props: ['article']
}
</script>

