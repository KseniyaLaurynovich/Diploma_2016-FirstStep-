import React from 'react';
import Button from '../Button/Button';
import styles from './styles.css';
export default function (props){
        return(
        <div className={styles.task}>
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text">{props.task.Name}</h2>
          </div>
          <div className="mdl-card__supporting-text">
             {props.task.Description}
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <Button
             className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
                 <i className="material-icons">create</i>
             </Button>
          </div>
        </div>
        );
};
