<template>

  <div id="export-button">

    <v-btn color="green" @click="export_" fab dark>

      <v-icon id="export-icon">save_alt</v-icon>

    </v-btn>

    <exporting :dialog="exporting"></exporting>

      <v-snackbar v-model="error" bottom color="error">
          {{ errorText }}
          <v-btn color="white" flat @click="error = false">Close</v-btn>
      </v-snackbar>

  </div>

</template>

<script>
  import Exporting from "./Exporting";
  export default {
    name: "ExportButton",
    components: {Exporting},
    data () {
      return {
        exporting: false,
        error: false,
        errorText: ''
      }
    },
    methods: {
      export_ () {
        if (!this.$store.getters.tables.length)
        {
          return
        }
        const path = this.$electron.remote.dialog.showSaveDialog({
          filters: [{name: 'Database', extensions: ['db']}]
        })
        if (path) {
          this.exporting = true
          this.$store.dispatch('export_', {path: path}).then( () => {
            this.exporting = false
          }).catch((text) => {
            this.errorText = text.toString()
            this.exporting = false
            this.error = true
          })
        }
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