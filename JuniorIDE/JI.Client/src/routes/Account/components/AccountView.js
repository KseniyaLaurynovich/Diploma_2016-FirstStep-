import React  from 'react'
import Dropzone from 'react-dropzone-component';
import './AccountView.scss'
import DefaultAccountImage from '../../../assets/default-avatar.png'

import { Image, Glyphicon, DropdownButton, MenuItem, Row, Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, HelpBlock, ButtonToolbar, Alert } from 'react-bootstrap'

var dropzoneConfig = {
    postUrl: 'no-url'
};

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

function renderPrivateInfoEditMode(props){
    
    var singleFileUpload = function(file){
        var self = this;
        self.files.forEach(function(f){
            if(f !== file)
            self.removeFile(f)
        });
        props.handlePhotoChange(file);
    }

    return(
        <div className='privateInfoForm'>
            <Row hidden={props.saveError == null}>
                <Col md={12}>
                    <Alert bsStyle="danger">
                        <p>{props.saveError}</p>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <FormGroup controlId="firstName">
                        <label className='label-left'>First name</label>
                        <FormControl type="text" onChange={props.handleFirstNameChange}
                            defaultValue={props.userInfo.firstName}/>
                    </FormGroup>

                    <FormGroup controlId="lastName">
                        <label className='label-left'>Last name</label>
                        <FormControl type="text" onChange={props.handleLastNameChange}
                            defaultValue={props.userInfo.lastName}/>
                    </FormGroup>

                    <FormGroup controlId="patronymic">
                        <label className='label-left'>Patronymic</label>
                        <FormControl type="text" onChange={props.handlePatronymicChange}
                            defaultValue={props.userInfo.patronymic}/>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup controlId="email">
                        <label className='label-left'>Email</label>
                        <FormControl type="email" onChange={props.handleEmailChange}
                                    defaultValue={props.userInfo.email}/>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup controlId="photo">
                        <label className='label-left'>Photo</label>
                        <Dropzone config={dropzoneConfig}
                            eventHandlers={{ addedfile: singleFileUpload }}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup className='pull-right'>
                        <ButtonToolbar>
                            <Button onClick={() => props.setPrivateInfoEditMode(false)}>
                                Cancel
                            </Button>
                            <Button className='success' onClick={props.saveAccountDetails}>
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

function renderPrivateInfoViewModel(props){
    return (
        <div>
            <Row>
                <Col md={5}>
                    <h4 className='title'>First name</h4>
                    <p>{props.userInfo.firstName}</p>

                    <h4 className='title'>Last Name</h4>
                    <p>{props.userInfo.lastName}</p>

                    <h4 className='title'>Patronymic</h4>
                    <p>{props.userInfo.patronymic}</p>

                    <h4 className='title'>Email</h4>
                    <p>{props.userInfo.email}</p>
                </Col>
                
                <Col md={5}>
                    <Image className='user-photo' src={props.userInfo.photo || DefaultAccountImage} circle />
                </Col>
                <Col md={2}>
                    <Button className='pull-right' onClick={() => props.setPrivateInfoEditMode(true)}>Edit</Button>
                </Col>
            </Row>
        </div>
    )
}

function filteredGroups(props){
  return props.groups
  .filter((group) => {
    return props.userInfo && _.findIndex(props.userInfo.groups, function(g){
      return g.id == group.id
    }) == -1
  })
}

function addGroup(props, group){
  var groups = props.userInfo.groups || []
  groups.push(group)

  props.handleGroupsChanges(groups)
}

function removeGroup(props, group){
  var index = props.userInfo.groups.indexOf(group)
  if(index != -1){
    var groups = props.userInfo.groups
    groups.splice(index, 1)

    props.handleGroupsChanges(groups)
  }
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
    <hr/>
    <div className='privateInfoSection'>
        <h3><b>Private Details</b></h3>
        {
            props.isPrivateInfoEditMode
            ? renderPrivateInfoEditMode(props)
            : renderPrivateInfoViewModel(props)
        } 
    </div>
    <hr/>
    {
        props.userInfo.roles.indexOf('Student') !== -1 && 
        <div className='groupSection'>
            <h3><b>Groups</b></h3>
            <Row>
                <Col xs={8} md={4}>
                    <DropdownButton
                    dropup
                    disabled={filteredGroups(props).length == 0}
                    title="Add group"
                    id="bg-nested-dropdown">
                    {
                        props.groups && filteredGroups(props).map((group, index) => (
                        <MenuItem onClick={() => addGroup(props, group)} key={index}>
                            { group.name }
                        </MenuItem>
                        ))
                    }
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={12} xs={12}>
                {
                 props.userInfo.groups.map((group, index) => (
                    <Row key={index}>
                    <Col md={8} sm={6} xs={6}>
                        <p className='modal-title margin-right-10-px'>{group.name}</p>
                    </Col>

                    <Col md={4} sm={6} xs={6}>
                        <Glyphicon className='glypicon--button glypicon-sm' glyph='remove'
                        onClick={() => removeGroup(props, group)}/>
                    </Col>
                    </Row>
                ))
                }
                
            </Col>
            </Row>
         </div>
    }
</div>
)

export default AccountView