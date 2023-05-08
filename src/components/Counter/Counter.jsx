import * as React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from './Counter.module.css'


export default function Counter(props) {
  return (
    <Grid container sx={props.styles} className={styles.panelCounter}>
      <Grid item xs={4} container justify="flex-end" alignItems="center">
        {props.icon}
      </Grid>
      <Grid item xs={8} container justify="flex-end" alignItems="right">
        <Typography className={styles.infoPanel}>
          <Grid component="span" className={styles.counterNumber}>
            {props.count}
          </Grid><br />
          <Grid component="span" className={styles.counterHint}>
            {props.hint}
          </Grid>
        </Typography>
      </Grid>

    </Grid>
  );
}

