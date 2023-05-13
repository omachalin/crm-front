import * as React from 'react';
import styles from './Counter.module.css'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function CounterChart(props) {
  return (
    <div style={props.styles} className={styles.panelCounter}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" hide />
          <Tooltip />
          <Line type="monotone" dataKey="income" name="Прибыль" stroke="#00F740" />
          <Line type="monotone" dataKey="expense" name="Расход" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

