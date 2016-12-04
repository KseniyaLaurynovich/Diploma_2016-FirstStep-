import React from 'react'
import Registration from '../components/Registration/Registration'
import * as helpers from '../utils/accountHelper'
import store from '../store'
import { connect } from 'react-redux'
import { registrationFailed } from '../actions/AccountActions'

var RegistrationContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  handleRegistration: function(e){
    e.preventDefault();

    var userData = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      confirmPassword: e.target.elements.confirmPassword.value
    }

    var router = this.context.router;
    helpers.register(userData)
    .then(function(result){
      router.push('/login');
    },function(error){
      store.dispath(registrationFailed(error));
    })

  },
  render: function(){
    return (
      <Registration
        handleSubmit={this.handleRegistration}
        error={this.error}/>
    );
  }
});

const mapStateToProps = store => {
    return {
        error: store.registration.error
    };
};

export default connect(mapStateToProps)(RegistrationContainer);
