<template>

  <div id="export-button">

    <v-btn color="green" @click="export_" fab dark>

      <v-icon id="export-icon">save_alt</v-icon>

    </v-btn>


  </div>

</template>

<script>
  export default {
    name: "ExportButton",
    data () {
      return {
        loading: false
      }
    },
    methods: {
      export_ () {
        this.$root.$children[0].$children[1].loading = true
        this.$store.dispatch('export_', {name: 'Test', path: '/Users/inields/Downloads/data3.db'}).then( () => {
          this.$root.$children[0].$children[1].loading = false
        })
      }
    }
  }
</script>

<style scoped>

  #export-button {
    position: fixed;
    bottom: 6rem;
    right: 1rem;
  }

  #export-icon {
    display: inherit !important;
  }

</style>