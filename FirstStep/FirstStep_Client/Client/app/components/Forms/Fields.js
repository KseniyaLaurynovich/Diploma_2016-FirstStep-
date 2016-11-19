import React from 'react'

export const renderTextBox = ({ input, label, type, meta: { touched, error } }) => (
  <div className="mdl-textfield mdl-js-textfield">
    <label>{label}</label>
    <div>
      <input className="mdl-textfield__input" {...input} type={type}/>
      { touched && error && <span>{error}</span> }
    </div>
  </div>
);

export const renderTextArea = ({input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea className="mdl-textfield__input" rows="10" {...input}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
