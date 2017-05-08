import { injectReducer } from '../../store/reducers'
import { actions } from './modules/subjectsGrid'
import { handleHeaderChange } from '../../store/header'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: 'subjects',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const SubjectsGrid =
        requireAuthorization(require('./containers/SubjectGridContainer').default, ['Teacher'])
      const reducer = require('./modules/subjectsGrid').default

      injectReducer(store, { key: 'subjectsGrid', reducer })

      store.dispatch(handleHeaderChange("Subjects"))
      store.dispatch(actions.fetchSubjects())
      store.dispatch(actions.fetchGroups())
      
      cb(null, SubjectsGrid)

    }, 'subjects')
  }
})
