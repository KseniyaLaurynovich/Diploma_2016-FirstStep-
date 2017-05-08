// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import LoginLayout from '../layouts/LoginLayout'

import Home from './Home'
import LoginRoute from './Login'
import RegistrationRoute from './Registration'
import UsersGridRoute from './AdminRoutes/UsersGrid'
import GroupsGridRoute from './AdminRoutes/GroupsGrid'
import SubjectsGridRoute from './SubjectGrid/'
import TasksGridRoute from './TaskGrid/'
import TestsGridRoute from './TestGrid/'
import TaskRoute from './Task'
import AccountRoute from './Account'
import StatisticRoute from './Statistic'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([{
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    UsersGridRoute(store),
    GroupsGridRoute(store),
    SubjectsGridRoute(store),
    TasksGridRoute(store),
    TaskRoute(store),
    TestsGridRoute(store),
    AccountRoute(store),
    StatisticRoute(store)
  ]
},
{
  path        : '/account',
  component   : LoginLayout,
  indexRoute  : LoginRoute,
  childRoutes : [
    LoginRoute(store),
    RegistrationRoute(store)
  ]
}])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
