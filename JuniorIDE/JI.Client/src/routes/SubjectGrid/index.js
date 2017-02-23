import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'subjects',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const SubjectsGrid = require('./containers/SubjectsGridContainer').default
      const reducer = require('./modules/subjectsgrid').default

      injectReducer(store, { key: 'subjectsgrid', reducer })
      cb(null, SubjectsGrid)

    }, 'subjects')
  }
})
