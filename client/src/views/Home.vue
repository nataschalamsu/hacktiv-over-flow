<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <Navbar/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    HelloWorld
  }
}
</script>
