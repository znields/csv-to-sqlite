<template>

  <v-app id="app">

    <toolbar></toolbar>

    <v-content>

        <router-view></router-view>

    </v-content>

  </v-app>

</template>

<script>
  import Toolbar from "./components/Toolbar";
  export default {
    name: 'csv-to-sqlite',
    components: {Toolbar}
  }
</script>

<style>

  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);

  body {
    font-family: Roboto, sans-serif;
  }

</style>
