<template>

  <v-toolbar app dark fixed color="blue">

    <v-toolbar-side-icon v-if="showBackButton" @click="back">
      <v-icon>arrow_back</v-icon>
    </v-toolbar-side-icon>

    <v-toolbar-title class="white--text">CSV to SQLite</v-toolbar-title>

    <v-spacer></v-spacer>

  </v-toolbar>
  
</template>

<script>
  export default {
    name: "Toolbar",
    computed: {
      showBackButton () {
        return this.$route.name === 'table-editor-view'
      }
    },
    methods: {
      back () {
        this.$router.push({ name: 'table-list-view'})
      }
    }
  }
</script>

<style scoped>

</style>