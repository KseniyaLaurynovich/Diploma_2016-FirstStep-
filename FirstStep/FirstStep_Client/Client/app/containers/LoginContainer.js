import React from 'react'
import Login from '../components/Login/Login'
import * as helpers from '../utils/accountHelper'

var LoginContainer = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;

    helpers.login(email, password);
  },
  render: function(){
    return(
      <Login handleSubmit={this.handleSubmit}/>
    );
  }
});

export default LoginContainer;
