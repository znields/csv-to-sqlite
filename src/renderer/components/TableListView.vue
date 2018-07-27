<template>

  <div id="table-list-view">

    <table-list></table-list>

    <export-button></export-button>

    <add-button></add-button>

  </div>
  
</template>

<script>
  import AddButton from "./TableListView/AddButton";
  import TableList from "./TableListView/TableList";
  import ExportButton from "./TableListView/ExportButton";
  export default {
    name: "TableListView",
    components: {ExportButton, TableList, AddButton}
  }
</script>

<style scoped>

</style>