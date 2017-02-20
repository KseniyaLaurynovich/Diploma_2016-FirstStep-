import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'
import { validationState } from '../../../utils/constants'
import LogoImage from '../../../assets/Logo.png'
import './RegistrationView.scss'

export const Registration = (props) => (
  <div className='registrationPage'>
    <Form className='registrationForm' horizontal onSubmit={props.submit}>
     <img className='logo' src={LogoImage} />
     <FormGroup controlId="formHorizontalUsername">
         <label className='label-left'>Username</label>
         <FormControl type="text" required onChange={props.onUsernameChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalEmail">
         <label className='label-left'>Email</label>
         <FormControl type="email" required onChange={props.onEmailChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalPassword">
         <label className='label-left'>Password</label>
         <FormControl type="password" required onChange={props.onPasswordChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalConfirmPassword"
                validationState={props.confirmPasswordError != null ? 'error' : null}>
         <label className='label-left'>Confirm password</label>
         <FormControl type="password" required onChange={props.onConfirmPasswordChange}/>
     </FormGroup>

     <hr/>

     <FormGroup controlId="formHorizontalFirstName">
         <label className='label-left'>First name</label>
         <FormControl type="text" required onChange={props.onFirstNameChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalLastName">
         <label className='label-left'> Last name</label>
         <FormControl type="text" required onChange={props.onLastNameChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalPatronymic">
         <label className='label-left'>Patronymic</label>
         <FormControl type="text" required onChange={props.onPatronymicChange}/>
     </FormGroup>

     <FormGroup validationState={props.validationState}>
          <HelpBlock>{props.registrationError}</HelpBlock>
     </FormGroup>

     <FormGroup>
         <Button className='success full-width' type="submit" disabled={props.isLoading}>
           {props.isLoading ? 'Loading...' : 'Sign up'}
         </Button>
     </FormGroup>

   </Form>
 </div>
 )

 Registration.propTypes = {
   submit   : React.PropTypes.func.isRequired
 }

export default Registration
