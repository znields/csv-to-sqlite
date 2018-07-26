<template>

  <v-data-table :headers="headers" :items="tables" hide-actions class="elevation-1" id="table-list">
    <template slot="items" slot-scope="props">

      <td>{{ props.index }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.path }}</td>
      <td>
        <v-icon @click="editTable(props.index)">edit</v-icon>
        <v-icon @click="deleteTable(props.index)">delete</v-icon>
      </td>

    </template>

  </v-data-table>

</template>

<script>
  export default {
    name: "TableList",
    data () {
      return {
        headers: [
          {text: 'ID', value: 'id', sortable: false},
          {text: 'Table Name', value: 'name', sortable: false},
          {text: 'Path to CSV', value: 'path', sortable: false},
          {text: '', value: '', sortable: false}
        ]
      }
    },
    computed: {
      tables: {
        get () {
          return this.$store.getters.tables
        }
      }
    },
    methods: {
      deleteTable (id) {
        this.$store.commit('DELETE_TABLE', {id: id})
      },
      editTable (id) {
        this.$router.push({ name: 'table-editor-view', params: { id: id }})
      }
    }
  }
</script>

<style scoped>

</style>