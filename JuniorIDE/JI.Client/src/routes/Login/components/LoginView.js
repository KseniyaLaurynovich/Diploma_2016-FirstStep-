import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'

const validationState = ['success','warning','error',null]

export const Login = (props) => (
    <Form horizontal onSubmit={props.submit}>
      {props.loginState in validationState}
     <FormGroup controlId="formHorizontalEmail"
                validationState={props.loginState in validationState ? props.loginState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Username
       </Col>
       <Col sm={10}>
         <FormControl type="text" required placeholder="Username" onChange={props.onUsernameChange}/>
       </Col>
     </FormGroup>

     <FormGroup controlId="formHorizontalPassword"
                validationState={props.loginState in validationState ? props.loginState : null}>
       <Col componentClass={ControlLabel} sm={2}>
         Password
       </Col>
       <Col sm={10}>
         <FormControl type="password" required placeholder="Password" onChange={props.onPasswordChange}/>
       </Col>
     </FormGroup>
     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Checkbox onChange={props.onIsRememberChange}>Remember me</Checkbox>
       </Col>
     </FormGroup>


     <FormGroup validationState={props.loginState}>
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
