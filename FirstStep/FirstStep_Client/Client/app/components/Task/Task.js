import React from 'react';
import Button from '../Button/Button';

export default function (props){
        return(
            <div>
                <div>
                    <div>
                        {props.task.Name}
                    </div>
                </div>
                <div>
                    {props.task.Description}
                </div>
                <div>
                    <Button
                     className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
                         <i className="material-icons">create</i>
                     </Button>
                </div>
            </div>
        );
};
