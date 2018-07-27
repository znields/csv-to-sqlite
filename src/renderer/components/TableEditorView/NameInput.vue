<template>

    <v-text-field solo v-model="name" placeholder="Table Name"></v-text-field>

</template>

<script>
  export default {
    name: "NameInput",
    computed: {
      name: {
        get () {
          return this.$store.getters.name(this.$route.params.id)
        },
        set (name) {
          this.$store.commit('UPDATE_NAME', {id: this.$route.params.id, name: name.replace(/\s/g, '')})
        }
      }
    }
  }
</script>

<style scoped>



</style>