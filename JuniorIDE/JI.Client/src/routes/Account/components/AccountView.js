import React  from 'react'
import './AccountView.scss'

import { Row, Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock, ButtonToolbar, Alert } from 'react-bootstrap'

function renderDetailsEditMode(props){
    return(
        <div className='changePasswordForm'>
            <Row hidden={props.saveError == null}>
                <Col md={12}>
                    <Alert bsStyle="danger">
                        <p>{props.saveError}</p>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <label className='label-left'>Username</label>
                    <FormControl type="text" onChange={props.handleUsernameChange}
                                defaultValue={props.userInfo.userName}/>
                </Col>
                <Col md={5}>
                    <FormGroup controlId="formHorizontalOldPassword">
                        <label className='label-left'>Old password</label>
                        <FormControl type="password" onChange={props.handleOldPasswordChange}/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNewPassword">
                        <label className='label-left'>New password</label>
                        <FormControl type="password" onChange={props.handleNewPasswordChange}/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalConfirmPassword">
                        <label className='label-left'>Confirm password</label>
                        <FormControl type="password" onChange={props.handleConfirmNewPasswordChange}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup className='pull-right'>
                        <ButtonToolbar>
                            <Button onClick={() => props.setDetailsEditMode(false)}>
                                Cancel
                            </Button>
                            <Button className='success' onClick={props.save}>
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
                <Button className='pull-right' onClick={() => props.setDetailsEditMode(true)}>Edit</Button>
            </Col>
        </Row>
    )
}

const AccountView = (props) => (
<div className='accountPage'>
    <Row>
        <Col md={2} mdOffset={10}>
            <Button className='pull-right' onClick={props.logoutUser}>Logout</Button>
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