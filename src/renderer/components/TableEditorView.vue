<template>

  <div id="table-editor-view">

    <v-container fluid grid-list-sm>

      <v-layout>

        <v-flex xs6>

          <name-input></name-input>

        </v-flex>

        <v-flex xs6>

          <file-input></file-input>

        </v-flex>

      </v-layout>

      <v-layout fluid grid-list-sm>

        <v-flex xs12>

          <column-list></column-list>

        </v-flex>

      </v-layout>

    </v-container>

  </div>

</template>

<script>
  import FileInput from "./TableEditorView/FileInput";
  import NameInput from "./TableEditorView/NameInput";
  import ColumnList from "./TableEditorView/ColumnList";
  export default {
    name: "TableEditorView",
    components: {ColumnList, NameInput, FileInput}
  }
</script>

<style scoped>

</style>