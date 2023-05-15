import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styles from '../Table.module.css'

export default function TableRowCashboxIncome(props) {
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{props.index + 1}</TableCell>
        <TableCell align="left">{props.row.name}</TableCell>
        <TableCell align="left">
          {
            props.row.agreements.map((agreement) => (
              <div className={styles.agreement}>
                <div className={styles.callTdTable}>
                  <span title='Пин Колл'>{agreement.coming?.call_readonly?.pin}</span>
                </div>
                {agreement.number}
                <div className={styles.lawyerTdTable}>
                  <span title='Пин ЮПП'>{agreement.coming.upp_readonly?.map(({pin}) => pin).join(', ')}</span>
                </div>
              </div>
            ))
          }
        </TableCell>
        <TableCell align="left">{props.row.type_payment.name}</TableCell>
        <TableCell align="left">{props.row.type_money.name}</TableCell>
        <TableCell align="left">{props.row.money}</TableCell>
      </TableRow></>
  )
}
