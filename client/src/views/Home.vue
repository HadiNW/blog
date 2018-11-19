<template>
  <div class="container2 mt-4">   
      <div class="row ">
         <div class="col-md-3 mt-4">
                        <div class="card">
                            <div class="card-header bg-custom">
                               Menu
                            </div>
                            <ul class="list-group list-group-flush">
                              
                            </ul>
                        </div>
                    </div>
             <div class="col-3">
              <div class="row">
                    <div class="container">  
                        <button class="btn btn-primary mb-3 mt-4" data-toggle="modal" data-target="#create"><i class="fa fa-plus"></i>&nbsp;
                                Add new article
                        </button>                       
                      <div class="row">
                      <MyCard v-for="article in articles" :key="article._id" :article="article"  @deleteArticle="deleteArticle($event)" @updateArticle="getArticle($event)"></MyCard>
                      </div>
                    </div>
              </div>
             </div>
              <div class="col-6" >
              <div class="row">
                    <div class="container">  
                                          
                      <div class="row">
                          <router-view></router-view>
                      </div>
                    </div>
              </div>
             </div>
            <Modal @createArticle="getMyarticle"></Modal>
            <ModalEdit :article="article" @onUpdate="getMyarticle"></ModalEdit>
    </div>
  
  </div>
</template>



<script>
import axios from 'axios'
import config from '@/config.js'

export default {
  data() {
    return{
      articles: [],
      article: {}
    }
  },
  components: {
    MyCard: () => import('@/components/MyCard'),
    Modal: () => import('@/components/ModalCreate'),
    ModalEdit: () => import('@/components/ModalEdit'),
    // routerview: viewDetail
  },
  created() {
    this.getMyarticle()
    this.checkLogin()
  },
  methods: {
     checkLogin(event) {        
          console.log('check login')
        this.isLogin = event
        if (localStorage.getItem('token')) {
            this.isLogin = true
        } else {
            this.isLogin = false
            this.$router.push('/login')
        }
      },
    getMyarticle(){
      axios({
        method: 'GET',
        url: `${config.host}/myarticles`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.articles = data
        // this.$refs.viewDetail.getDetailArticle()
        this.eek = false
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteArticle(id){
      console.log('called')
        axios({
            method:'DELETE',
             url: `${config.host}/articles/${id}`,
              headers: {
                   token: localStorage.getItem('token')
              }
        })
        .then(({data}) => {
            this.getMyarticle()
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    getArticle(id){
        axios({
             method:'GET',
             url: `${config.host}/articles/${id}`,
              headers: {
                   token: localStorage.getItem('token')
              }
        })
        .then(({data}) => {
            this.article = data
            console.log(data.title)
            console.log(this.article.title)

            $('#update').modal('show');
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
  }
}
</script>

<style>
    body{
      height: 100vh;
    }
    .container2 {
      margin-left: 50px;
      margin-right: 0px;      
    }
</style>
