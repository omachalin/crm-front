import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import styles from './Table.module.css'
import { Libs } from '../../../../Libs';
const settings = require('../../../../settings.json');

export default function TableRowAgreement(props) {
  let paid_transport = 0
  let paid_agreement = 0

  for (let key of props.row.cashboxes) {
    if (key.type_payment_fk === settings.statuses.agreements.paid_transport) {
      paid_transport += key.money
    } else if (key.type_payment_fk === settings.statuses.agreements.paid_agreement) {
      paid_agreement += key.money
    }
  }

  let summa = props.row.price + props.row.price_transport

  let paidPercent = (paid_transport + paid_agreement) / summa * 100
  let backgroundClass = styles.notPaidAgreement
  if (paidPercent >= 100) {
    backgroundClass = styles.fullPaymentsAgreement
  } else if (paidPercent < 100 && paidPercent > 70) {
    backgroundClass = styles.partiallyPaymentsAgreement
  }

  if (props.row.dissolution)
    backgroundClass = styles.dissolutionAgreement

  return (
    <>
      <TableRow className={backgroundClass} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">1</TableCell>
        <TableCell align="center">{props.getTime(props.row.create_date_time)}</TableCell>
        <TableCell align="left">{props.row.coming.name}</TableCell>
        <TableCell align="left">{props.row.coming.client.phone}</TableCell>
        <TableCell align="center" style={{ 'position': 'relative' }}>
          {props.row.number}
          <div className={styles.lawyerTdTable}>
            {props.row.coming.upp}
          </div>
        </TableCell>
        <TableCell align="left">{props.row.coming.theme.name}</TableCell>
        <TableCell align="center">{Libs.getSpaceNumber(props.row.price)}</TableCell>
        <TableCell align="center">{Libs.getSpaceNumber(props.row.price - paid_agreement)}</TableCell>
        <TableCell align="center">{Libs.getSpaceNumber(props.row.price_transport)}</TableCell>
        <TableCell align="center">{Libs.getSpaceNumber(props.row.price_transport - paid_transport)}</TableCell>
        <TableCell align="center">{props.row.service?.name}</TableCell>
        <TableCell align="left">{props.row.note}</TableCell>
        <TableCell align="center">
          <CurrencyRubleIcon className='moneyIcon' onClick={(e) => { props.finance(props.row) }} />
          <EditIcon className='editIcon' onClick={(e) => { props.update(props.row) }} />
          <DeleteForeverIcon className='removeIcon' onClick={(e) => { props.remove(props.row) }} />
        </TableCell>

      </TableRow></>
  )
}