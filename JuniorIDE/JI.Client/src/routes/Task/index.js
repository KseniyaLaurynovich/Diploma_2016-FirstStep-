import { injectReducer } from '../../store/reducers'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/task/:taskId',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TaskContainer =
        requireAuthorization(require('./containers/TaskContainer').default, ['Teacher'])
      const reducer = require('./modules/task').default

      injectReducer(store, { key: 'task', reducer })
      cb(null, TaskContainer)

    }, 'task')
  }
})
