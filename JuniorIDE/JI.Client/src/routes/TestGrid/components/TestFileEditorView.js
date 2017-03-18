import React from 'react'
import { connect } from 'react-redux'
import { Button, Glyphicon } from 'react-bootstrap'
import uuid from 'uuid/v4'
import requests from '../../../utils/requests'

const TestFileEditorView = React.createClass({
  getInitialState() {
    return this.props.defaultValue || null
  },

  onFileChange(event) {
    this.setState({
      file    : event.target.files[0],
      name    : "Uploading ...",
      tempId  : uuid()
    })
  },

  focus() {
  },

  onSave(){
      this.props.onUpdate(this.state);
  },

  onCancel(){
    this.props.onUpdate(this.props.defaultValue);
  },

  render() {
    return (
      <div>
        <input type='file' className='input-file' onChange={this.onFileChange}/>
        <Button className='padding-sm mr-5 mt-5' onClick={this.onSave}>
          <Glyphicon
            className  = 'glypicon--pointer'
            glyph      = 'ok'/>
        </Button>
        <Button className='padding-sm mr-5 mt-5' onClick={this.onCancel}>
          <Glyphicon
            className  = 'glypicon--pointer'
            glyph      = 'remove'/>
        </Button>
      </div>
    );
  }
})

export default TestFileEditorView
