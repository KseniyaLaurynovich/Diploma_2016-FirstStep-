import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Row, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'
import { validationState } from '../../../utils/constants'
import LogoImage from '../../../assets/Logo.png'
import './RegistrationView.scss'

export const Registration = (props) => (
  <div className='registrationPage'>
    <Form className='registrationForm' horizontal onSubmit={props.submit}>
     <img className='registration-logo' src={LogoImage} />
     <Row>
       <Col md={6}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalUsername">
             <label className='label-left'>Username</label>
             <FormControl type="text" required onChange={props.onUsernameChange}/>
         </FormGroup>
       </Col>

       <Col md={6}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalEmail">
             <label className='label-left'>Email</label>
             <FormControl type="email" required onChange={props.onEmailChange}/>
         </FormGroup>
       </Col>
     </Row>

     <Row>
       <Col md={6}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalPassword">
             <label className='label-left'>Password</label>
             <FormControl type="password" required onChange={props.onPasswordChange}/>
         </FormGroup>
       </Col>
       <Col md={6}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalConfirmPassword"
                    validationState={props.confirmPasswordError != null ? 'error' : null}>
             <label className='label-left'>Confirm password</label>
             <FormControl type="password" required onChange={props.onConfirmPasswordChange}/>
         </FormGroup>
       </Col>
     </Row>

     <hr/>

     <Row>
       <Col md={12}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalFirstName">
             <label className='label-left'>First name</label>
             <FormControl type="text" required onChange={props.onFirstNameChange}/>
         </FormGroup>
       </Col>
     </Row>

     <Row>
       <Col md={12}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalLastName">
             <label className='label-left'> Last name</label>
             <FormControl type="text" required onChange={props.onLastNameChange}/>
         </FormGroup>
       </Col>
     </Row>

     <Row>
       <Col md={12}>
         <FormGroup className='form-group-no-margin' controlId="formHorizontalPatronymic">
             <label className='label-left'>Patronymic</label>
             <FormControl type="text" required onChange={props.onPatronymicChange}/>
         </FormGroup>
       </Col>
     </Row>

     <Row>
       <Col md={12}>
         <FormGroup className='form-group-no-margin' validationState={props.validationState}>
              <HelpBlock>{props.registrationError}</HelpBlock>
         </FormGroup>
       </Col>
     </Row>

     <Row>
       <Col md={12}>
         <FormGroup className='form-group-no-margin'>
             <Button className='success full-width' type="submit" disabled={props.isLoading}>
               {props.isLoading ? 'Loading...' : 'Sign up'}
             </Button>
         </FormGroup>
       </Col>
      </Row>
   </Form>
 </div>
 )

 Registration.propTypes = {
   submit   : React.PropTypes.func.isRequired
 }

export default Registration
