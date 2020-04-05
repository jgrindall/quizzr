<template>
  <div class="homePage">
    <p>Home</p>
    <p>{{selectedPlayer}}</p>
    <button>Add questions</button>
    <button>Start quiz</button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {

    },
    mounted:()=>{
      window.alert("load");
    },
    computed:{
        ...mapState(['selectedPlayer'])
    },
    methods:{

    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  button{

  }
</style>
