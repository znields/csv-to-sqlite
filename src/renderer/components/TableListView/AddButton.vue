<template>

  <div id="add-button">
    <v-btn color="red" fab dark>
      <v-icon>add</v-icon>
    </v-btn>
  </div>

</template>

<script>
  export default {
    name: 'AddButton'
  }
</script>

<style scoped>

  #add-button {
    position: fixed;
    right: 1rem;
    bottom: 2rem;
  }

</style>