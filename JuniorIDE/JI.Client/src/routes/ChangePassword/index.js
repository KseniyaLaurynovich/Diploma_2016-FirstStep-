import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'changepassword',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const ChangePassword = require('./containers/ChangePasswordContainer').default
      const reducer = require('./modules/changepassword').default

      injectReducer(store, { key: 'changepassword', reducer })
      cb(null, ChangePassword)

    }, 'changepassword')
  }
})
