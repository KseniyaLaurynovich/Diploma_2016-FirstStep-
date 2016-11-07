import React from 'react';
import Button from '../Button/Button';

export default function(props){
     const { handleOk, handleCancel, children } = props;
      return (
          <div>
              {children}
              <div>
                <Button onClick={handleOk}>OK</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
          </div>
    );
};
