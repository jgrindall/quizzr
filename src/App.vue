<template>
  <div id="app">
    <router-link to="/login">Home</router-link>
    <router-view/>
  </div>
</template>

<script>

//const SOCKET_URL = 'localhost:3000';
//const io = require('socket.io-client');
//const socket = io(SOCKET_URL);

export default {
  name: 'App'
}
</script>

<style>
  #app {

  }
</style>
