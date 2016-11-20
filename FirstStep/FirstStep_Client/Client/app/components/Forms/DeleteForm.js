import React from 'react'
import { Button } from 'react-bootstrap'

export default function(props){
     const { handleOk, handleCancel, children } = props;
      return (
          <div>
              {children}
              <div>
                <Button onClick={handleOk}>OK</Button>
              </div>
          </div>
    );
};
