import { injectReducer } from '../../store/reducers'
import { fetchTask } from './modules/task'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/task/:taskId',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TaskContainer =
        requireAuthorization(require('./containers/TaskContainer').default, ['Teacher'])
      const reducer = require('./modules/task').default

      injectReducer(store, { key: 'task', reducer })

      store.dispatch(fetchTask(nextState.params.taskId))

      cb(null, TaskContainer)

    }, 'task')
  }
})
