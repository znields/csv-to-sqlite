<template>

  <div id="add-button">

    <v-btn color="red" @click="add" fab dark>

      <v-icon id="add-icon">add</v-icon>

    </v-btn>

  </div>

</template>

<script>
  export default {
    name: "AddButton",
    methods: {
      add() {
        this.$store.commit('ADD_TABLE', {name: '', path: ''})
        this.$router.push({ name: 'table-editor-view', params: { id: this.$store.getters.nextId }})
      }
    }
  }
</script>

<style scoped>

  #add-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  #add-icon {
    display: inherit !important;
  }

</style>