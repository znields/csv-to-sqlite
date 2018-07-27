const state = {
  tables: [
    {name: 'Test', path: '/Users/inields/Downloads/data3.csv'}
  ],
  columns: [
    {}, {}
  ]
}

const getters = {
  tables: (state) => {
    return state.tables
  },
  columns: (state) => (id) => {
    let columns = []
    for (const name in state.columns[id]) {
      columns.push({name: name, type: state.columns[id][name]})
    }
    return columns
  },
  name: (state) => (id) => {
    return state.tables[id] ? state.tables[id].name : ''
  },
  path: (state) => (id) => {
    return state.tables[id] ? state.tables[id].path : ''
  },
  nextId: (state) => {
    return state.tables.length - 1
  },
  type: (state) => (id, name) => {
    return state.columns[id][name]
}
}

const mutations = {
  ADD_TABLE (state, {name, path}) {
    state.tables.push({id: state.tables.length, name: name, path: path})
    state.columns.push({})
  },
  DELETE_TABLE (state, {id}) {
    state.tables.splice(id, 1)
    state.columns.splice(id, 1)
  },
  UPDATE_COLUMNS (state, {id, columns}) {
    state.columns[id] = columns
  },
  UPDATE_NAME (state, {id, name}) {
    try {
      state.tables[id].name = name
    } catch (e) {
      console.log(id, state.tables[id])
    }

  },
  UPDATE_PATH (state, {id, path}) {
    state.tables[id].path = path
  },
  UPDATE_TYPE (state, {id, name, type}) {
    state.columns[id][name] = type
  }
}

const actions = {
  loadColumns(context, {id}) {
    return new Promise( (resolve, reject) => {
      const path = state.tables[id].path
      this.$firstline(path).then((data) => {
        let columns = {}
        let columnNames = data.replace(/"/g, "").split(',')
        for (const name of columnNames) {
          columns[name] = state.columns[id][name] ? state.columns[id][name] : 'text'
        }
        context.commit('UPDATE_COLUMNS', {id: id, columns: columns})
        resolve()
      }).catch((e) => {reject(e)})
    })
  },
  export_ (context, {path}) {
    let db = new this.$sqlite3.Database(path)
    return new Promise( (resolve, reject) =>
    {
      db.serialize(() => {
        // gets the list of tables from state
        let tables = this.getters.tables

        // iterates over the tables
        for (let i in tables)
        {
          db.run('DROP TABLE IF EXISTS ' + tables[i].name)

          // sets up initial variables for creating database
          let Q = ''
          let CQ = ''
          let CI = []
          let columns = this.getters.columns(i)

          // iterate over the columns in the table
          for (let column of columns)
          {
            Q += '?, '
            CQ += column.name + ' ' + column.type + ', '
            CI.push()
          }
          CQ = CQ.substring(0, CQ.length - 2)
          Q = Q.substring(0, Q.length - 2)

          db.run('CREATE TABLE ' + tables[i].name + ' (' + CQ + ')')

          let placeholders = '(' + columns.map(() => '? ').join(',') + ')'

          let stream = this.$fs.createReadStream(tables[i].path);
          let csvStream = this.$csv()
              .on("data", function(data) {
                db.run('INSERT INTO ' + tables[i].name + ' VALUES ' + placeholders, data)
              })
              .on("end", function() {
                resolve()
              });

          stream.pipe(csvStream);
        }
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
