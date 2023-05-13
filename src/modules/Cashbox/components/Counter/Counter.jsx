import * as React from 'react';
import styles from './Counter.module.css'


export default function Counter(props) {
  return (
    <div style={props.styles} className={styles.panelCounter}>
      <div className={styles.block}>
          <div className={styles.iconCounter}>{props.icon}</div>
          <div className={styles.info}>Период: {props.peroid || 0}</div>
          <div className={styles.info}>Месяц: {props.month || 0}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.blockTop}>
          <div className={styles.counterHint}>
              {props.hint}
          </div>
            <div className={styles.counterNumber}>
                {props.count || 0}
            </div>
        </div>
        <div className={styles.info2}>Нал: {props.cash || 0}</div>
        <div className={styles.info2}>Безнал: {props.cashless || 0}</div>
      </div>

    </div>
  );
}

