import React from 'react';
import styles from './styles.css';

export default function(props){
    return(
        <button
        className={props.className}
        data-related-id={props.relatedId}
        onClick={props.onClick}>
            {props.children}
        </button>
    );
}
