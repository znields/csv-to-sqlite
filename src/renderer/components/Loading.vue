<template>

    <v-dialog v-model="loading" persistent max-width="350">
        <v-card>
            <v-card-title class="headline">
                <v-progress-circular indeterminate :size="50" color="green"></v-progress-circular>
                <span style="margin-left: 50px">Exporting Database</span>
            </v-card-title>
        </v-card>
    </v-dialog>

</template>

<script>
  export default {
    name: "Loading",
    data () {
      return {
        loading: false
      }
    }
  }
</script>

<style scoped>



</style>