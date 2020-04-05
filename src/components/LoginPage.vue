<template>
  <div class="loginPage">
    <login-list @select='onSelect' :players = 'players' :selectedPlayer = 'selectedPlayer'/>
    <input type="password" v-model="password"/>
    <button @click="clickLogin">Log in</button>
  </div>
</template>

<script>
  import LoginList from './LoginList'
  import { mapState } from "vuex";
  export default {
    components: {
      "login-list": LoginList
    },
    computed:{
        ...mapState(['players', 'selectedPlayer'])
    },
    methods:{
      onSelect(p){
        this.$store.dispatch("onPlayerSelected", p);
      },
      clickLogin(){
        this.$store.dispatch('onLogin', {password: this.password});
      }
    },
    data() {
      return {
        password: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{

  }
</style>
