import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'
import { validationState } from '../../../utils/constants'

export const Registration = (props) => (
    <Form horizontal onSubmit={props.submit}>
     <FormGroup controlId="formHorizontalUsername"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Username
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="Username" onChange={props.onUsernameChange}/>
         <HelpBlock>{props.userError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalEmail"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Email
       </Col>
       <Col sm={10}>
         <FormControl type="email" required placeholder="Email" onChange={props.onEmailChange}/>
         <HelpBlock>{props.emailError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalPassword"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Password
       </Col>
       <Col sm={10}>
         <FormControl type="password" required placeholder="Password" onChange={props.onPasswordChange}/>
         <HelpBlock>{props.passwordError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalConfirmPassword"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Confirm password
       </Col>
       <Col sm={10}>
         <FormControl type="password" required placeholder="Confirm password" onChange={props.onConfirmPasswordChange}/>
         <HelpBlock>{props.confirmPasswordError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalFirstName"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         First name
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="First name" onChange={props.onFirstNameChange}/>
         <HelpBlock>{props.firstNameError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalLastName"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Last name
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="Last name" onChange={props.onLastNameChange}/>
         <HelpBlock>{props.lastNameError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalPatronymic"
                validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Patronymic
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="Patronymic" onChange={props.onPatronymicChange}/>
         <HelpBlock>{props.patronymicError}</HelpBlock>
       </Col>
     </FormGroup>

     <FormGroup validationState={validationState.indexOf(props.registrationState) != -1 ? props.registrationState : null}>
        <Col smOffset={2} sm={10}>
          <HelpBlock>{props.registrationState == 'error' ? props.loginError : ''}</HelpBlock>
        </Col>
     </FormGroup>

     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Button type="submit" disabled={props.isLoading}>
           {props.registrationState == 'loading' ? 'Loading...' : 'Sign up'}
         </Button>
       </Col>
     </FormGroup>

   </Form>
 )

 Registration.propTypes = {
   submit   : React.PropTypes.func.isRequired
 }

export default Registration
