<template>
    <div class="container mt-5">
      <div class="row">
        <!-- Latest Posts -->
        <main class="posts-listing col-lg-8"> 
          <div class="container">
            <div class="row">
             <CardBlog v-for="article in articles" :key="article._id" :article="article"></CardBlog>
            </div>
          </div>
        </main>
        <aside class="col-lg-4">
        <search></search>
        </aside>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import config from '@/config.js'
export default {
    data() {
        return {
            articles: []
        }
    },
    components: {
        CardBlog: () => import('@/components/CardBlog.vue'),
        LatestPost: () => import('@/components/LatestPost'),
        Search: () => import('@/components/Search')
    },
    methods: {
        getAllArticle() {
            axios({
                method: 'GET',
                url: `${config.host}/articles`
            })
            .then(({data}) => {
                this.articles = data
                console.log(this.articles)
            })
        },
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
    },

    created() {
        this.getAllArticle()
        this.checkLogin()
    }
}
</script>

