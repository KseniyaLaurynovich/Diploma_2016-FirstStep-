import React from 'react'
import UserEditFormView from '../components/UserEditFormView'

const UserEditForm = React.createClass({
  getInitialState(){
    return {
      firstName   : null,
      lastName    : null,
      patronymic  : null,
      email       : null,
      roles       : []
    }
  },
  componentWillReceiveProps(props){
    if(props.user){
      this.setState({
           firstName  : props.user.firstName,
           lastName   : props.user.lastName,
           patronymic : props.user.patronymic,
           email      : props.user.email,
           roles      : props.user.roles
         })
     }
  },
  onFirstNameChange(event){
    var user = this.state
    user.firstName = event.target.value

    this.setState(user)
  },
  onLastNameChange(event){
    var user = this.state
    user.lastName = event.target.value

    this.setState(user)
  },
  onPatronymicChange(event){
    var user = this.state
    user.patronymic = event.target.value

    this.setState(user)
  },
  onEmailChange(event){
    var user = this.state
    user.email = event.target.value

    this.setState(user)
  },
  onRolesChange(roles){
    var user = this.state
    user.roles = roles

    this.setState(user)
  },
  saveChanges(event){
    event.preventDefault()
    this.props.saveEditedUser(this.props.user, this.state)
    this.props.setEditModalShowing(null, false)
  },
  render(){
    return (
    <UserEditFormView
      user                   = {this.state}
      roles                  = {this.props.roles}
      showModal              = {this.props.showEditModal}
      close                  = {() => this.props.setEditModalShowing(null, false)}

      submit                 = {this.saveChanges}
      handleFirstNameChange  = {this.onFirstNameChange}
      handleLastNameChange   = {this.onLastNameChange}
      handlePatronymicChange = {this.onPatronymicChange}
      handleRolesChanges     = {this.onRolesChange}
      handleEmailChange      = {this.onEmailChange}/>
  )}
})

export default UserEditForm
