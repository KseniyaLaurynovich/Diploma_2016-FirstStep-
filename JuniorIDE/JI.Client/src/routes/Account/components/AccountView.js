import React  from 'react'
import './AccountView.scss'

import { Row, Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock, ButtonToolbar } from 'react-bootstrap'

function renderDetailsEditMode(props){
    return(
        <div className='changePasswordForm' onSubmit={props.submit}>
            <Row>
                <Col md={6}>
                    <label className='label-left'>Username</label>
                    <FormControl type="text" 
                                required 
                                onChange={props.handleUsernameChange}
                                defaultValue={props.userInfo.userName}/>
                    <FormGroup className='text-right'>
                        <ButtonToolbar>
                            <Button onClick={() => props.setDetailsEditMode(false)}>
                                Cancel
                            </Button>
                            <Button className='success' onClick={props.saveUsername} disabled={ props.isLoading }>
                                {props.isLoading ? 'Loading...' : 'Save'}
                            </Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId="formHorizontalOldPassword">
                        <label className='label-left'>Old password</label>
                        <FormControl type="password" onChange={props.handleOldPasswordChange}/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNewPassword">
                        <label className='label-left'>New password</label>
                        <FormControl type="password" onChange={props.handleNewPasswordChange}/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalConfirmPassword"
                                validationState={props.confirmNewPasswordError != null ? 'error' : null}>
                        <label className='label-left'>Confirm password</label>
                        <FormControl type="password" onChange={props.handleConfirmNewPasswordChange}/>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalError" validationState='error'>
                         <HelpBlock>{props.changePasswordError}</HelpBlock>
                    </FormGroup>
                    <FormGroup className='text-right'>
                        <ButtonToolbar>
                            <Button onClick={() => props.setDetailsEditMode(false)}>
                                Cancel
                            </Button>
                            <Button className='success' onClick={props.savePassword}>
                                Save
                            </Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

function renderDetailsViewModel(props){
    return (
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
                <Button onClick={() => props.setDetailsEditMode(true)}>Edit</Button>
            </Col>
        </Row>
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
        {
            props.isDetailsEditMode
            ? renderDetailsEditMode(props)
            : renderDetailsViewModel(props)
        }
       
    </div>
</div>
)

export default AccountView