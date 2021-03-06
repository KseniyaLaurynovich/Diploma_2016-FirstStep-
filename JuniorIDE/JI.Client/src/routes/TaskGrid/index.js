import { injectReducer } from '../../store/reducers'
import { fetchSubject } from './modules/taskGrid'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/:subjectId/tasks',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TasksGrid =
        requireAuthorization(require('./containers/TaskGridContainer').default, ['Teacher'])
      const reducer = require('./modules/taskGrid').default

      injectReducer(store, { key: 'tasksGrid', reducer })

      store.dispatch(fetchSubject(nextState.params.subjectId))

      cb(null, TasksGrid)

    }, 'tasks')
  }
})
