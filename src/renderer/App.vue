<template>

  <div id="app">

    <toolbar></toolbar>

    <router-view></router-view>

  </div>

</template>

<script>
  import Toolbar from './components/Toolbar'
  export default {
    name: 'csv-to-sqlite',
    components: {Toolbar}
  }
</script>

<style>

  @import url(https://fonts.googleapis.com/icon?family=Roboto);

  body {
    font-family: 'Roboto', sans-serif;
  }

</style>



