import { injectReducer } from '../../store/reducers'
import requireAuthorization from '../requireAuthorization'

export default (store) => ({
  path: 'account_settings',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const Account = requireAuthorization(require('./containers/AccountContainer').default)
      const reducer = require('./modules/account').default

      injectReducer(store, { key: 'account', reducer })
      cb(null, Account)

    }, 'account_settings')
  }
})
