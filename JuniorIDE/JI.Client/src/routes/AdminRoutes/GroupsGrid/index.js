import { injectReducer } from '../../../store/reducers'
import requireAuthorization from '../../requireAuthorization'

export default (store) => ({
  path: 'groupsgrid',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const GroupsGrid = requireAuthorization(
        require('./containers/GroupGridContainer').default, ['Administrator'])
      const reducer = require('./modules/groupsgrid').default

      injectReducer(store, { key: 'groupsGrid', reducer })
      cb(null, GroupsGrid)

    }, 'groupsgrid')
  }
})
