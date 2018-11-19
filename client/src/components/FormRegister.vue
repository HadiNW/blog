<template>
  <div class="col-12 mb-4">
		<Header></Header>
		<div class="col-lg-4 m-auto">
			<div class="card text-center card-form">
				<div class="card-body">
					<h3>Register</h3>
					<p>Please fill out this form to register</p>
					<form @submit.prevent="register()">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Name" autofocus v-model="name">
						</div>
						<div class="form-group">
							<input type="email" class="form-control" placeholder="Email" v-model="email">
						</div>
						<div class="form-group">
							<input type="password" class="form-control" placeholder="Password" v-model="password">
							<small id="passwordHelpBlock" class="form-text text-muted text-left">
								Your password must be 3-20 characters long.
							</small>
						</div>
						<input type="submit" value="Register" class="btn btn-info btn-block font-weight-bold">
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
			name: '',
			email: '',
			password: ''
		}
	},

	methods: {
		register(){
			console.log(config.host)
			axios({
				method: 'POST',
				url: `${config.host}/users/register`,
				data: {
					name: this.name,
					email: this.email,
					password: this.password
				}
			})
			.then(({data}) => {
				console.log(data)
				this.$router.push('/login')
			})
			.catch(err => {
				console.log(err.response.data.message)
			})
		}
	}
}
</script>

