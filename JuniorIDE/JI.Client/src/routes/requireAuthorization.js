import React from 'react'
import Login from './Login/containers/LoginContainer'
import { connect } from 'react-redux'

export default function requireAuthorization(Component, allowedRoles) {

    class AuthenticatedComponent extends React.Component {
        checkAuth (isAuthenticated, roles) {
            return isAuthenticated
                   && (!allowedRoles || allowedRoles.some(r => roles.indexOf(r) != -1))
        }

        render () {
            return (
              <div>
                {   this.checkAuth(this.props.isAuthenticated, this.props.roles)
                    ? <Component {...this.props}/>
                    : <Login />
                }
              </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        roles: state.user.credentials.roles,
        isAuthenticated: state.user.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
