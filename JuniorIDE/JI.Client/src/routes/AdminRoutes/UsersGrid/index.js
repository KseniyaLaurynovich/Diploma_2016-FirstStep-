import { injectReducer } from '../../../store/reducers'
import requireAuthorization from '../../requireAuthorization'

export default (store) => ({
  path: 'usersgrid',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const UsersGrid = requireAuthorization(
        require('./containers/UsersGridContainer').default, ['Administrator'])
      const reducer = require('./modules/usersgrid').default

      injectReducer(store, { key: 'usersGrid', reducer })
      cb(null, UsersGrid)

    }, 'usersgrid')
  }
})
