import { injectReducer } from '../../../store/reducers'
import { handleHeaderChange } from '../../../store/header'
import requireAuthorization from '../../requireAuthorization'

export default (store) => ({
  path: 'usersgrid',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const UsersGrid = requireAuthorization(
        require('./containers/UsersGridContainer').default, ['Administrator'])
      const reducer = require('./modules/usersgrid').default

      injectReducer(store, { key: 'usersGrid', reducer })

      store.dispatch(handleHeaderChange("Users"))

      cb(null, UsersGrid)

    }, 'usersgrid')
  }
})
