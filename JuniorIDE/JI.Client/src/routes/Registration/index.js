import { injectReducer } from '../../store/reducers'
import { fetchRolesWithGroups } from './modules/registration'

export default (store) => ({
  path: 'registration',

  getComponent (nextState, cb){

    require.ensure([], (require) => {

      const Registration = require('./containers/RegistrationContainer').default
      const reducer = require('./modules/registration').default

      injectReducer(store, { key: 'registration', reducer })

      //fetch required dat for container
      store.dispatch(fetchRolesWithGroups())

      cb(null, Registration)

    }, 'registration')
  }
})
