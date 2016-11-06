import React from 'react';
import styles from './styles.css';

export default function(props){
    return(
        <div
        className={styles.button}
        data-related-id={props.relatedId}
        onClick={props.click}>
            {props.children}
        </div>
    );
}
