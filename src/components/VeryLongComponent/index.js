import React from 'react';
import styles from './component.module.scss';

class VeryLongComponent extends React.Component {
  render() {
    return (
      <div className={styles['long-component']}>
        <div className={styles['long-component__content']}>
          Very long component <br />
          Just scroll it
        </div>
      </div>
    );
  }
}

export default VeryLongComponent;
