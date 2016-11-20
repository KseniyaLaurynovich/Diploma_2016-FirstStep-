import React from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import store from '../store'

export function requireAuthentication(Component, allowedRoles) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated, this.props.roles);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated, this.props.roles);
        }

        checkAuth (isAuthenticated, roles) {
            if (!isAuthenticated
                || !allowedRoles.some(element => roles.indexOf(element) != -1)) {
                let redirectAfterLogin = this.props.location.pathname;
                store.dispatch(push('/login'));
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
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
