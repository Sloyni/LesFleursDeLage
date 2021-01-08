<template>
  <div class="bg-gradient-gray text-center fullscreen flex flex-center">
    <div style="width:70%;">
        <img src="/images/logo.jpg" class="mx-auto mb-5" width="50%">
        <a class="block font-900" style="font-size:160%;">Les fleurs de l'âge</a>
        <a class="block" style="font-size:120%;">Application</a>

        <q-banner dense inline-actions rounded :class="error_cls" class="my-5 text-white bg-red">
          {{ error }}
        </q-banner>

        <q-input outlined label="Identifiant" @keyup="clearError" v-model="username" />
        <q-input outlined label="Mot de passe" type="password" class="my-3" @keyup="clearError" v-model="password" />

        <q-btn @click="login" color="primary" size="16px" class="mt-5" label="Se connecter" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login: function(){
      if(this.username.length>0&&this.password.length>0){
        this.$store.dispatch('loginUser',{username:this.username,password:this.password}).then( () =>  {
          if(this.$store.getters.getLoginError.length>0){
            this.error = this.$store.getters.getLoginError
            this.error_cls='error-active'
          }
          if(this.error.length==0){
            this.$router.push({name:'Index'})
          }
        })
      } else {
        this.error = 'Veuillez remplir tous les champs'
        this.error_cls='error-active'
      }
    },
    clearError: function(){
      this.error= ''
      this.error_cls='error-notactive'
    }
  },
  data: function (){
    return {
      username: '',
      password: '',
      error: '',
      error_cls: 'error-notactive',
    }
  },

  name: 'PageIndex'
}
</script>
