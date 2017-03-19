import React from 'react'
import Login from './Login/containers/LoginContainer'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function requireAuthorization(Component, allowedRoles) {

    class AuthenticatedComponent extends React.Component {
        checkAuth (isAuthenticated, roles) {
            return isAuthenticated
                   && (!allowedRoles || allowedRoles.some(r => roles.indexOf(r) != -1))
        }

        render () {
          if(this.checkAuth(this.props.isAuthenticated, this.props.roles))
          {
            return (
              <Component {...this.props}/>
            )
          }
          browserHistory.push('/account/login')
          return null
        }
    }

    const mapStateToProps = (state) => ({
        roles: state.user.credentials ? state.user.credentials.roles : [],
        isAuthenticated: state.user.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
