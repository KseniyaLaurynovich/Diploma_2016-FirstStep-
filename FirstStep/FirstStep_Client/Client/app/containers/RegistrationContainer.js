import React from 'react'
import Registration from '../components/Registration/Registration'
import * as helpers from '../utils/accountHelper'

var RegistrationContainer = React.createClass({
  username: "",
  password: "",
  handleRegistration: function(e){
    e.preventDefault();

    var userData = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      confirmPassword: e.target.elements.confirmPassword.value
    }

    helpers.register(userData)
    .then(function(result){
    })

  },
  render: function(){
    return (
      <Registration
        handleSubmit={this.handleRegistration}
        username={this.username}
        password={this.password}
        password={this.confirmPassword}/>
    );
  }
});

export default RegistrationContainer;
