<template>
    <div>
      <h1>PAGE</h1>
        <h1>{{ article.title }}</h1>
         <p>{{ article.description }}</p>
    </div>
</template>

<script>
export default {
  data() {
      return {
          article: ''
      }
  },
  mounted() {
    console.log('ahahaha')
    console.log(this.$route)
    //   console.log(this)
    //   console.log(this.$route.params.id)
    this.getOneArticle()
  },
  methods:{
      getOneArticle(id) {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/articles/'+this.$route.params.id
        })
        .then(({data}) => {
          this.article = data
        })
        .catch(err => {
          console.log(err)
        })
      }
  },
  watch: {
     $route () {
         this.getOneArticle()
     }
  }
}
</script>

