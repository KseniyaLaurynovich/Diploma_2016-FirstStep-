import React from 'react'
import Login from '../components/Login/Login'
import * as helpers from '../utils/accountHelper'
import store from '../store'
import { connect } from 'react-redux'
import { loginSuccess, loginFailed } from '../actions/AccountActions'
import { login } from '../utils/cookieHelper'

var LoginContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  handleSubmit: function(e){
    e.preventDefault();

    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    var router = this.context.router;

    helpers.login(email, password)
    .then(function(result){
        var userData = {
          username: result.data.userName,
          jwt: result.data.access_token,
          roles: result.data.roles.split(',')
        }
        var expires = result.data[".expires"];
        var date = new Date(Date.parse(expires));

        store.dispatch(loginSuccess(userData.username, userData.jwt, userData.roles, date));
        login(userData, date);

        if(userData.roles.indexOf('Admin') !== -1){
          router.push("/admin");
        }
        else{
          router.push("/");
        }
      }, function(error){
        var loginError = error.response.data.error_description;
        store.dispatch(loginFailed(loginError));
      });
  },
  render: function(){
    return(
      <Login handleSubmit={this.handleSubmit} error={this.props.error}/>
    );
  }
});

const mapStateToProps = store => {
    return {
        error: store.auth.error
    };
};

export default connect(mapStateToProps)(LoginContainer);
