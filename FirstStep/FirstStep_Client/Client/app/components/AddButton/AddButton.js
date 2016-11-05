import React from 'react';
import styles from './styles.css';

export default function(props){
    return(
        <div className={styles.button} onClick={props.click}>+</div>
    );
}
