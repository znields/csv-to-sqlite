<template>

  <v-text-field solo readonly :value="path()" @click="choose" @click:prepend-inner="choose" prepend-inner-icon="attach_file"></v-text-field>

</template>

<script>
  export default {
    name: "FileInput",
    methods: {
      choose () {
        const path = this.$electron.remote.dialog.showOpenDialog({
          filters: [{name: 'CSV', extensions: ['csv']}],
          properties: ['openFile']
        })
        if (path) {
          this.$store.commit('UPDATE_PATH', {id: this.$route.params.id, path: path[0]})
          this.$parent.$children[2].loadColumns()
          this.$forceUpdate()
        }
      },
      path () {
        return this.$store.getters.path(this.$route.params.id)
      }
    }
  }
</script>

<style scoped>

</style>