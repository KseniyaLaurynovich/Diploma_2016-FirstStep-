import { injectReducer } from '../../store/reducers'
import { fetchTask } from './modules/testGrid'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/task/:taskId/tests',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TestGridContainer =
        requireAuthorization(require('./containers/TestGridContainer').default, ['Teacher'])
      const reducer = require('./modules/testGrid').default

      injectReducer(store, { key: 'testGrid', reducer })

      store.dispatch(fetchTask(nextState.params.taskId))

      cb(null, TestGridContainer)

    }, 'task')
  }
})
