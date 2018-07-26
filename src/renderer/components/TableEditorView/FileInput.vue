<template>

  <v-text-field solo readonly v-model="path" @click="choose" label="Path to CSV" append-icon="attach_file"></v-text-field>

</template>

<script>
  export default {
    name: "FileInput",
    computed: {
      path: {
        get () {
          return this.$store.getters.path(this.$route.params.id)
        },
        set (path) {
          this.$store.commit('UPDATE_PATH', {id: this.$route.params.id, path: path})
        }
      }
    },
    methods: {
      choose () {
        const path = this.$electron.remote.dialog.showOpenDialog({
            filters: [{name: 'CSV', extensions: ['csv']}],
            properties: ['openFile', 'openDirectory']
        })
        if (path) {
          this.path = path[0]
          this.$parent.$children[2].loadColumns()
        }
      }
    }
  }
</script>

<style scoped>

</style>