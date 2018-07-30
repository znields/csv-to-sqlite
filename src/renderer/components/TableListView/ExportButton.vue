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

      <v-snackbar v-model="success" bottom color="green">
          Database successfully exported!
          <v-btn color="white" flat @click="success = false">Close</v-btn>
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
        errorText: '',
        success: false,
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
          }).then(() => {
            this.success = true
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