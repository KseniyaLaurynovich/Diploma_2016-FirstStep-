import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'usersgrid',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const UsersGrid = require('./containers/UsersGridContainer').default
      const reducer = require('./modules/usersgrid').default

      injectReducer(store, { key: 'usersGrid', reducer })
      cb(null, UsersGrid)

    }, 'usersgrid')
  }
})
