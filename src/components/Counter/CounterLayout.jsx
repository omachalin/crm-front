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
                <CounterChart
                  styles={row.styles}
                />
              ) : (
                <Counter
                  styles={row.styles}
                  count={row.count}
                  icon={row.icon}
                  hint={row.hint}
                />
              )}
            </Grid>
          ))}
        </>
      }
    </Grid>
  );
}

export default CounterLayout;
