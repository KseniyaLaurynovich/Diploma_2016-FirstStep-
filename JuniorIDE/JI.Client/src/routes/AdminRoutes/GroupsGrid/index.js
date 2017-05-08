import { injectReducer } from '../../../store/reducers'
import { handleHeaderChange } from '../../../store/header'
import requireAuthorization from '../../requireAuthorization'

export default (store) => ({
  path: 'groupsgrid',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const GroupsGrid = requireAuthorization(
        require('./containers/GroupGridContainer').default, ['Administrator'])
      const reducer = require('./modules/groupsgrid').default

      injectReducer(store, { key: 'groupsGrid', reducer })

      store.dispatch(handleHeaderChange("Groups"))

      cb(null, GroupsGrid)

    }, 'groupsgrid')
  }
})
