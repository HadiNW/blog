<template>
      <div class="container container mt-4">
      <div class="row">
        <main class="post blog-post col-lg-8"> 
          <div class="container">
            <div class="post-single">
              <!-- <div class="post-thumbnail"><img src="https://images.pexels.com/photos/702123/pexels-photo-702123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="..." class="img-fluid"></div> -->
              <div class="post-details">
                <h1>{{ article.title }}<a href="#"><i class="fa fa-bookmark-o"></i></a></h1>
                <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
                               
                    <!-- <div class="title"><span>{{article.author}}</span></div> -->
                  <div class="d-flex align-items-center flex-wrap">       
                    <div class="date"><i class="icon-clock"></i> 2 months ago</div>
                    <div class="comments meta-last"><i class="icon-comment"></i>12</div>
                  </div>
                </div>
                <div class="post-body">
                  <p> <img src="https://images.pexels.com/photos/702123/pexels-photo-702123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" class="img-fluid"></p>
                     <p class="lead">{{ article.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div class="row">
        <div class="col-lg-8">
          <h2>Comments</h2>
           <div class="card text-center card-form">
                <div class="card-body">
                    <form @submit.prevent="createComment(article._id)">
                        <div class="form-group">
                            <textarea type="text"  class="form-control" v-model="comment" rows="3"></textarea>
                        </div>                       
                        <button class="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
           <Comment v-for="comment in comments" :key="comment._id" :comment="comment" @deleteComment="deleteComment($event)"></Comment>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import config from '@/config.js'


export default {
  data() {
    return {
      article:{},
      comment: '',
      comments: []
    }
  },
  components: {
    Comment: () => import('@/components/Comment')
  },
  mounted() {
    this.getDetailArticle()
    this.getComments()
  },
   watch: {
    $route(){
      this.getDetailArticle()
      this.getComments()
    }
  },
  methods: {
    getDetailArticle() {
      axios({
        method: 'GET',
        url: `${config.host}/articles/${this.$route.params.id}`
      })
      .then(({data}) => {
        this.article =  data
      })
      .catch(err => {
        console.log(err)
      })
    },

    getComments(){
        axios({
        method: 'GET',
        url: `${config.host}/comment/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.comments =  data
      })
      .catch(err => {
        console.log(err)
      })
    },
    
    createComment(id){
        axios({
          method: 'POST',
          url: `${config.host}/comment`,
          data: {
            comment: this.comment,
            article: id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.comments = data
          this.getComments()
          this.comment = ''
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteComment(id) {
        axios({
          method: 'DELETE',
          url: `${config.host}/comment/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.getComments()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

