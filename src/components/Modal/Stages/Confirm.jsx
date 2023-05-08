import * as React from 'react';
import { Grid } from '@mui/material';

export default function ModalIconContent(props) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item style={{textAlign: 'center'}} xs={2}>
        {props.icon}
      </Grid>
      <Grid item xs={10}>
        {props.value}
      </Grid>
    </Grid>
  )
}