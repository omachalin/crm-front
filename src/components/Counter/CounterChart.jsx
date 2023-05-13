import * as React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from './Counter.module.css'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function CounterChart(props) {
  const data = [
    {
      "name": "Page A",
      "Сумма": 4000,
    },
    {
      "name": "Page B",
      "Сумма": 3000,
    },
    {
      "name": "Page C",
      "Сумма": 3000,
    },
    {
      "name": "Page D",
      "Сумма": 3000,
    },
  ]

  return (
    <Grid container sx={props.styles} className={styles.panelCounter} style={{ position: 'relative' }}>
      {/* <Grid item xs={12} container justify="flex-end" alignItems="left" sx={{
        position: 'absolute',
        left: '-19px',
        top: '0',
        '& .recharts-wrapper': {
          position: 'relative',
          cursor: 'default',
          width: '500px',
          height: '150px !important',
          width: '100% !important',
        },
        '& .recharts-surface': {
          width: '100% !important',
          height: '115px !important',
        }
      }}>
        <LineChart width={500} height={150} data={data} legend={false}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="Сумма" stroke="#1976d2" yAxisId={0} />
        </LineChart>
    </Grid> */}
      {/* <Grid item xs={8} container justify="flex-end" alignItems="right">
        <LineChart width={500} height={150} data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Grid> */}

    </Grid>
  );
}

