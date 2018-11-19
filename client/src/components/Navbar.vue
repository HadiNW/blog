<template>
   <nav class="navbar navbar-expand-lg navbar navbar-dark navbar-custom">
      <div class="container">
        <a class="navbar-brand" href="/">JS Blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                 <router-link to="/">
                      <span class="nav-link">Home <span class="sr-only">(current)</span></span>
                 </router-link>            
            </li>
           
              <li class="nav-item active">
                 <router-link to="/articles">
                      <span class="nav-link">All Blogs <span class="sr-only">(current)</span></span>
                 </router-link>            
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0"> 
            <router-link to="/login">
                 <button class="btn btn-info my-2 my-sm-0" type="submit" v-if="!islogin">Login</button>
            </router-link>
            <router-link to="/register">
                  <button class="btn btn-outline-info my-2 my-sm-0 mx-3"  style="color:#fff" v-if="!islogin">Register</button>
            </router-link> 
             <button class="btn btn-outline-info my-2 my-sm-0 mx-3"  style="color:#fff" v-if="islogin" @click="logout">Logout</button>
           </div>
        </div>
      </div>
  </nav> 
</template>

<script>
export default {
  props: ['islogin'],
  methods: {
    logout(){
      console.log('logout')
      localStorage.removeItem('token')
       localStorage.removeItem('user')
      //  this.$router.push('/')
       this.$emit('logout')
    }
  }
};
</script>
