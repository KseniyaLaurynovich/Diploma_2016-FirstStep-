import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'

import './LoginView.scss'
import LogoImage from '../../../assets/Logo.png'

export const Login = (props) => (
  <div className='loginPage'>
    <Form className='loginForm' onSubmit={props.submit}>
     <img className='logo' src={LogoImage} />
     <FormGroup controlId="formHorizontalLogin"
                validationState={ props.validationState }>
       <FormControl type="text" required placeholder="Login" onChange={props.onLoginChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalPassword"
                validationState={ props.validationState }>
       <FormControl type="password" required placeholder="Password" onChange={props.onPasswordChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalRemember">
       <Checkbox onChange={props.onIsRememberChange}>Remember me</Checkbox>
     </FormGroup>

     <FormGroup validationState={ props.validationState }>
        <HelpBlock>{ props.loginError }</HelpBlock>
     </FormGroup>

     <FormGroup>
       <Button className='success full-width' type="submit" disabled={ props.isLoading }>
         {props.isLoading ? 'Loading...' : 'Sign in'}
       </Button>
     </FormGroup>
      <p className="message">{'Not registered? '}
        <Link to='/account/registration' activeClassName='route--active'>
          Create an account
        </Link>
      </p>
      <p className='message'>
        <Link to='/account/forgotpasword' activeClassName='route--active'>
          {'Forgot password?'}
        </Link>
      </p>
   </Form>
 </div>
 )

 Login.propTypes = {
   submit   : React.PropTypes.func.isRequired
 }

export default Login
