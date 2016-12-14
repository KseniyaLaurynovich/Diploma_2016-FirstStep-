import React from 'react'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

export const renderTextBox = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel htmlFor="text-field">{label}</ControlLabel>
    <FormControl id="text-field" {...input} type={type}/>
    { touched && error && <span>{error}</span> }
  </FormGroup>
);

export const renderDropdown = ({input, label, meta: { touched, error }, options }) => (
  <FormGroup>
    <ControlLabel htmlFor="text-field">{label}</ControlLabel>
      <FormControl componentClass="select" {...input}>
        {
          options.map((option) =>
            <option value={option.Key} key={option.Key}>{option.Value}</option>
          )
        }
        </FormControl>
    { touched && error && <span>{error}</span> }
  </FormGroup>
);

export const renderTextArea = ({input, label, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel htmlFor="text-field">{label}</ControlLabel>
    <FormControl id="text-field" componentClass="textarea" {...input}/>
    { touched && error && <span>{error}</span> }
  </FormGroup>
);

export const renderSwitch = ({input, label, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel htmlFor="text-field">{label}</ControlLabel>
    <FormControl id="text-field" componentClass="checkbox" {...input}/>
    { touched && error && <span>{error}</span> }
  </FormGroup>
);
