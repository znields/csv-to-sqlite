<template>

    <v-layout row justify-center>
        <v-dialog v-model="dialog" color="green" persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>Exporting Database
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>

</template>

<script>
  export default {
    name: "Exporting",
    props: ['dialog']
  }
</script>

<style scoped>



</style>