<template>

  <div id="table-list-view">

    <table-list></table-list>

    <add-button></add-button>

  </div>
  
</template>

<script>
  import AddButton from "./TableListView/AddButton";
  import TableList from "./TableListView/TableList";
  export default {
    name: "TableListView",
    components: {TableList, AddButton}
  }
</script>

<style scoped>

</style>