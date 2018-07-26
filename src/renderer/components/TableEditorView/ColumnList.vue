<template>

  <v-data-table :headers="headers" :items="columns()" hide-actions class="elevation-1" id="table-list">
    <template slot="items" slot-scope="props">

      <td>{{ props.item.name }}</td>
      <td><type-select :column-name="props.item.name"></type-select></td>

    </template>

  </v-data-table>

</template>

<script>
  import TypeSelect from "./TypeSelect";
  export default {
    name: "ColumnList",
    components: {TypeSelect},
    data () {
      return {
        headers: [
          {text: 'Column Name', value: 'name', sortable: false},
          {text: 'Data Type', value: 'path', sortable: false}
        ]
      }
    },
    methods: {
      columns () {
        return this.$store.getters.columns(this.$route.params.id)
      },
      loadColumns() {
        this.$store.dispatch('loadColumns', {id: this.$route.params.id})
            .then(() => { this.$forceUpdate() })
            .catch((e) => {  }) // TODO: alert the user that an invalid path was given
      }
    },
    mounted () {
      this.loadColumns()
    }
  }
</script>

<style scoped>

  .type-select {
    width: 250px;
  }

</style>