const state = {
  tables: [
    {name: 'TableName', path: '/Users/inields/Downloads/data3.csv'},
    {name: 'TableName', path: 'TablePath'}

  ],
  columns: [
    {'AccessoryDisplayEnabled': 'dddd'}
  ]
}

const getters = {
  tables (state) {
    return state.tables
  }
}

const mutations = {
  ADD_TABLE (state, {name, path}) {
    state.tables.push({id: state.tables.length, name: name, path: path})
    state.columns.push({})
  },
  DELETE_TABLE (state, {id}) {
    state.tables.splice(id, 1)
  },
  LOAD_COLUMNS (state, {id}) {
    const path = state.tables[id].path
    this.$firstline(path).then(data => {
      let columns = {}
      let columnNames = data.replace(/"/g,"").split(',')
      for (const name of columnNames) {
        columns[name] = state.columns[id][name] ? state.columns[id][name] : 'text'
      }
      state.columns[id] = columns
    })
  }
}

export default {
  state,
  mutations
}
