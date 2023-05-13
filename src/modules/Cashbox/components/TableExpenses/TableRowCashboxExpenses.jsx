import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableRowCashboxExpenses(props) {
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{props.index + 1}</TableCell>
        <TableCell align="left">{props.row.name}</TableCell>
        <TableCell align="left">{props.row.type_money.name}</TableCell>
        <TableCell align="left">{props.row.money}</TableCell>
      </TableRow></>
  )
}