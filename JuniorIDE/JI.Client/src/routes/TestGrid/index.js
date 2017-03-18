import { injectReducer } from '../../store/reducers'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: '/task/:taskId/tests',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const TestGridContainer =
        requireAuthorization(require('./containers/TestGridContainer').default, ['Teacher'])
      const reducer = require('./modules/testGrid').default

      injectReducer(store, { key: 'testGrid', reducer })
      cb(null, TestGridContainer)

    }, 'task')
  }
})
