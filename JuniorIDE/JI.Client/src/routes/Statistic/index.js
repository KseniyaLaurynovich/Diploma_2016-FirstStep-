import { injectReducer } from '../../store/reducers'
import { fetchTask, fetchGroups } from './modules/statistic'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: 'statistic/:taskId',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const SubjectsGrid =
        requireAuthorization(require('./containers/StatisticContainer').default, ['Teacher'])
      const reducer = require('./modules/statistic').default

      injectReducer(store, { key: 'statistic', reducer })

      store.dispatch(fetchTask(nextState.params.taskId))
      store.dispatch(fetchGroups(nextState.params.taskId))
      
      cb(null, SubjectsGrid)

    }, 'statistic')
  }
})
