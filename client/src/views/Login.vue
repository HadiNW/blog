<template>
     <div class="container mt-4">
        <Header></Header>
        <div class="col-lg-4 mx-auto my-auto">
            <alert :alert="alert" :notif="notif"></alert>
            <div class="card text-center card-form">
                <div class="card-body">
                    <h3>Login</h3>
                    <p>Please fill out this form to login</p>
                    <form @submit.prevent="login()">
                        <div class="form-group">
                            <input type="email"  class="form-control" placeholder="Email" autofocus v-model="email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <input type="submit" value="Login" class="btn btn-block font-weight-bold" id="btn-login">
                    </form>
                </div>
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
            email: '',
            password: '',
            isLogin: false,
            alert: '',
            notif: ''
        }
    },
    components: {
        alert: () => import('@/components/alert')
    },
    methods: {
        login(){
            if (this.email.length === 0 || this.password.length === 0) {
                this.notif = 'please fill all fields'
                this.alert = 'alert alert-danger'
            } else {
                    axios({
                    method: 'POST',
                    url: `${config.host}/users/login`,
                    data: {
                        email: this.email,
                        password: this.password
                    }
                    })
                    .then(({data}) => {
                        console.log(data)
                        this.isLogin = true
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user)
                        console.log(this.isLogin, 'ini adalah is loggg')
                        this.$emit('isLogin', this.isLogin)
                        this.$router.push('/')
                        
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            }
        }
    }
}
</script>



<style>
    #btn-login {
    background-color: #01A29A;
    color: white;}
</style>

