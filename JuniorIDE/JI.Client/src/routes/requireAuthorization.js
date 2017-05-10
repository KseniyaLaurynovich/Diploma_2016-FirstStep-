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
          console.log(this.props)
          if(this.checkAuth(this.props.isAuthenticated, this.props.roles))
          {
            if(this.props.location.pathname === '/'){
                var role = this.props.roles
                switch(role){
                    case('Administrator'): 
                        browserHistory.push('/usersgrid')
                        break;
                    case('Teacher'): 
                        browserHistory.push('/subjects')
                        break;
                    case('Student'): 
                        browserHistory.push('/account-settings')
                        break;
                }
            }
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
