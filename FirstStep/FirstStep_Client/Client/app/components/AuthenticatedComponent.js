import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {push} from 'redux-router'
import cookie from 'react-cookie'
import { loginSuccess } from '../actions/AccountActions'
import { login, loadAuthCookie } from '../utils/cookieHelper'

export function requireAuthentication(Component, allowedRoles) {

    class AuthenticatedComponent extends React.Component {
        loadCookie(){
          var userData = loadAuthCookie();
          if(userData){
            store.dispatch(
              loginSuccess(userData.username, userData.jwt, userData.roles, userData.expires));
          }
        }
        componentWillMount () {
            this.loadCookie();
            var auth = store.getState().auth;
            this.checkAuth(auth.isAuthenticated, auth.roles);
        }
        checkAuth (isAuthenticated, roles) {
            if (!isAuthenticated
                || !allowedRoles.some(element => roles.indexOf(element) != -1)) {
                let redirectAfterLogin = this.props.location.pathname;
                window.location.href = 'http://localhost:8080/#/login';
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                      && this.props.roles
                      && allowedRoles.some(element => this.props.roles.indexOf(element) != -1)
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.jwt,
        userName: state.auth.username,
        roles: state.auth.roles,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
