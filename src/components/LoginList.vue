<template>
  <div class="hello">
    <ul>
      <li v-for="p in players" :class="playerClass[p]" @click='selectPlayer(p)' >{{p}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed:{
      playerClass(){
        const classes = {};
        this.players.forEach(p=>{
          classes[p] = {
            player: true,
            selected: (p === this.selectedPlayer)
          };
        });
        return classes;
      }
    },
    methods:{
      selectPlayer(p){
        this.$emit('select', p);
      }
    },
    props:{
      players:{
        type: Array
      },
      selectedPlayer:{
        type:String
      }
    }
  }
</script>

<style scoped>
  ul{

  }
  li{

  }
  li.selected{
    color:red;
  }
</style>
