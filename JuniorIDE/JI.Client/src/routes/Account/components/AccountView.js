import React  from 'react'
import './AccountView.scss'

import { Row, Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap'

function renderEditable(props){
    return(
        <Form className='changePasswordForm' onSubmit={props.submit}>
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

            <FormGroup className='text-right'>
                <Button className='success' type="submit" disabled={ props.isLoading }>
                    {props.isLoading ? 'Loading...' : 'Save'}
                </Button>
            </FormGroup>
        </Form>
    )
}

const AccountView = (props) => (
<div className='accountPage'>
    <Row>
        <Col md={2} mdOffset={10}>
            <Button onClick={props.logoutUser}>Logout</Button>
        </Col>
    </Row>
    <hr/>
    <div className='changePasswordSection'>
        <h3><b>Account Details</b></h3>
        <Row></Row>
        <Row>
            <Col md={5}>
                <h4 className='title'>Username</h4>
                <p>{props.userInfo.userName}</p>
            </Col>
            <Col md={5}>
                <h4 className='title'>Password</h4>
                <p>••••••••</p>
            </Col>
            <Col md={2}>
                <Button>Edit</Button>
            </Col>
        </Row>
    </div>
</div>
)

export default AccountView