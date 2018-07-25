import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table-list-view',
      component: require('@/components/TableListView').default
    },
    {
      path: '/table-editor-view/:id',
      name: 'table-editor-view',
      component: require('@/components/TableEditorView').default
    }
  ]
})
