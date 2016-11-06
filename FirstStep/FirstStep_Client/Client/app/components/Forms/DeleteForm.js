import React from 'react';
import Button from '../Button/Button';

export default function(props){
     const { handleOk, handleCancel, children } = props;
      return (
          <div>
              {children}
              <div>
                <Button click={handleOk}>OK</Button>
                <Button click={handleCancel}>Cancel</Button>
              </div>
          </div>
    );
};
