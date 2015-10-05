import React from 'react';
import styles from './ModuleToolbar.css';

function ModuleToolbar(props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </div>
  );
}

export default ModuleToolbar;
