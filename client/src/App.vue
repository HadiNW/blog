<template>
  <div>
    <Navbar :islogin="isLogin" @logout="logout"></Navbar>  
      <!-- ini adalah hasil emit-->
       <router-view @isLogin="checkLogin($event)"></router-view> 
  
  </div> 
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    data() {
      return {
        isLogin: false
      }
    },
    components: {
      Navbar
    },
    methods: {
        checkLogin(event) {        
          console.log('check login')
        this.isLogin = event
        if (localStorage.getItem('token')) {
            this.isLogin = true
        } else {
            this.isLogin = false
            // this.$router.push('/login')
        }
      },

      logout() {
        localStorage.removeItem('token')
        this.isLogin = false
        this.checkLogin()
      }
    },
    created() {
      console.log('created')
      console.log(this.$router)
      this.checkLogin()
    },

    watch: {
      $route() {
        this.checkLogin()
      }
    }
  }
</script>

<style>
  
</style>
