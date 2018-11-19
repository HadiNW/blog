<template>
       <div class="modal fade" id="update" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Update Article</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="createArticle"> 
                           <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Title:</label>
                                <input type="text" class="form-control" v-model="title">
                        </div>                      
                        <div class="form-group">
                                <label for="recipient-name" class="col-form-label">description:</label>
                                <textarea  class="form-control" id="recipient-name" v-model="description" rows=10></textarea>
                        </div>
                        
                         <div class="form-group">
                          <label for="recipient-name" class="col-form-label">Image:</label>
                          <!-- <input type="file" class="form-control" v-model="image"> -->
                         </div>
                        <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="update">submit</button>
                              </div>
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
    props: ['article'],
    data(){
        return{
            title: '',
            description: '',
            image: ''
        }
    },
    
    methods: {
      update(id){
          axios({
              method: 'PUT',
              url: `${config.host}/articles/${this.$props.article._id}`,
              data: {
                  title: this.title,
                  description: this.description
              },
              headers:{
                  token: localStorage.getItem('token')
              }
          })
          .then(({data}) => {
              this.$emit('onUpdate')
          })
      }
    },
    watch : {
      article : function(now){
        console.log('modal : ', now)
        console.log(this.title)
      }
    }

   
}
</script>


<style>
     .modal-backdrop {
    z-index: 100000 !important;
  }

  .modal {
    z-index: 100001 !important;
  }
</style>

