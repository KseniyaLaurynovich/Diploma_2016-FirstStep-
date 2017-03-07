import { injectReducer } from '../../store/reducers'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: 'subjects',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const SubjectsGrid =
        requireAuthorization(require('./containers/SubjectsGridContainer').default, ['Teacher'])
      const reducer = require('./modules/subjectsGrid').default

      injectReducer(store, { key: 'subjectsGrid', reducer })
      cb(null, SubjectsGrid)

    }, 'subjects')
  }
})
