import { injectReducer } from '../../store/reducers'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/task/edit/:taskId',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TaskEditFormContainer =
        requireAuthorization(require('./containers/TaskEditFormContainer').default, ['Teacher'])
      const reducer = require('./modules/taskEditForm').default

      injectReducer(store, { key: 'taskEditForm', reducer })
      cb(null, TaskEditFormContainer)

    }, 'taskEditForm')
  }
})
