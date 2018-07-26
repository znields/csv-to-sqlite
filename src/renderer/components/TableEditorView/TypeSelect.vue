<template>
  <v-select class="type-select" v-model="type" :items="types"></v-select>
</template>

<script>
  export default {
    name: "TypeSelect",
    props: ['columnName'],
    computed: {
      type: {
        get () {
          return this.$store.getters.type(this.$route.params.id, this.columnName)
        },
        set (value) {
          this.$store.commit('UPDATE_TYPE', {id: this.$route.params.id, name: this.columnName, type: value})
        }
      }
    },
    data () {
      return {
        types: ['text', 'numeric', 'integer', 'real', 'blob']
      }
    }
  }
</script>

<style scoped>

</style>