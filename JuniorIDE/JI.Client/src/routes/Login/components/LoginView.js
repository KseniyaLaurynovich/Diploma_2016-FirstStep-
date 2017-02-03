import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'
import { validationState } from '../../../utils/constants'
import './LoginView.scss'

export const Login = (props) => (
    <Form onSubmit={props.submit} className='loginForm'>
      <h2 className='header'>Junior IDE</h2>
     <FormGroup controlId="formHorizontalLogin"
                validationState={validationState.indexOf(props.loginState) != -1 ? props.loginState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Login
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="Login" onChange={props.onLoginChange}/>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalPassword"
                validationState={validationState.indexOf(props.loginState) != -1 ? props.loginState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Password
       </Col>
       <Col sm={10}>
         <FormControl type="password" required placeholder="Password" onChange={props.onPasswordChange}/>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalRemember">
       <Col smOffset={2} sm={10}>
         <Checkbox onChange={props.onIsRememberChange}>Remember me</Checkbox>
       </Col>
     </FormGroup>

     <FormGroup validationState={validationState.indexOf(props.loginState) != -1 ? props.loginState : null}>
        <Col smOffset={2} sm={10}>
          <HelpBlock>{props.loginState == 'error' ? props.loginError : ''}</HelpBlock>
        </Col>
     </FormGroup>

     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Button type="submit" disabled={props.isLoading}>
           {props.loginState == 'loading' ? 'Loading...' : 'Sign in'}
         </Button>
       </Col>
     </FormGroup>

   </Form>
 )

 Login.propTypes = {
   submit   : React.PropTypes.func.isRequired
 }

export default Login
