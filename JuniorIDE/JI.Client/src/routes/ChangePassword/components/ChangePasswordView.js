import React from 'react'

import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'

import './ChangePassword.scss'
import LogoImage from '../../../assets/Logo.png'

export const ChangePasswordView = (props) => (
  <div className='changePasswordPage'>
    <Form className='changePasswordForm' onSubmit={props.submit}>
     <img className='logo' src={LogoImage} />

     <FormGroup controlId="formHorizontalOldPassword">
       <label className='label-left'>Old password</label>
       <FormControl type="password" required onChange={props.handleOldPasswordChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalNewPassword">
       <label className='label-left'>New password</label>
       <FormControl type="password" required onChange={props.handleNewPasswordChange}/>
     </FormGroup>

     <FormGroup controlId="formHorizontalConfirmPassword"
                validationState={props.confirmNewPasswordError != null ? 'error' : null}>
       <label className='label-left'>Confirm password</label>
       <FormControl type="password" required onChange={props.handleConfirmNewPasswordChange}/>
     </FormGroup>

     <FormGroup validationState={ props.validationState }>
        <HelpBlock>{ props.changePasswordError }</HelpBlock>
     </FormGroup>

     <FormGroup>
       <Button className='btn-submit' type="submit" disabled={ props.isLoading }>
         {props.isLoading ? 'Loading...' : 'Save'}
       </Button>
     </FormGroup>
     </Form>
   </div>
)

export default ChangePasswordView
