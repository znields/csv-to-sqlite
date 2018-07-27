<template>

    <div>

      <v-app id="app">

        <toolbar></toolbar>

        <v-content>

            <router-view></router-view>

        </v-content>

        </v-app>

        <loading></loading>

    </div>


</template>

<script>
  import Toolbar from "./components/Toolbar";
  import Loading from "./components/Loading";
  export default {
    name: 'csv-to-sqlite',
    components: {Loading, Toolbar}
  }
</script>

<style>

  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);

  body {
    font-family: Roboto, sans-serif;
    overflow: hidden;
  }

</style>
