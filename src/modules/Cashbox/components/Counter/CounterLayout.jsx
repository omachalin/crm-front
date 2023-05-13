import * as React from 'react';
import { Grid } from '@mui/material';
import Counter from './Counter';
import CounterChart from './CounterChart';


function CounterLayout(props) {
  return (
    <Grid
      container spacing={0} align="center" justify="center" alignItems="center"
      sx={{
        padding: '1.2%', boxShadow: '3',
      }}>
      {props.counter.length > 0 &&
        <>
          {props.counter.map((row, index) => (
            <Grid item xs key={index}>
              {row.chart ? (
                <CounterChart {...row} />
              ) : (
                <Counter {...row} />
              )}
            </Grid>
          ))}
        </>
      }
    </Grid>
  );
}

export default CounterLayout;
