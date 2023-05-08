import styles from './Table.module.css';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function TableRowComing(props) {
  let color = ''
  let background = ''

  switch (props.row.status.name) {
    case 'Первичка': // First
      color = '#ffff'
      background = '#1976d2'
      break;

    case 'Вторичка': // Again
      color = '#ffff'
      background = '#585859'
      break;

    case 'Договор': // Agreement
      background = '#66bb6a';
      color = '#ffff';
      break;

    case 'БК': // Bk
      color = '#000000'
      background = '#ffb33d'
      break;

    case 'Брак': // Reject
      color = '#ffff'
      background = '#ef5350'
      break;

    default:
      alert('Неизвестный тип статуса!')
      break;
  }
  console.log(props.row)
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center">
        {props.number}
      </TableCell>
      <TableCell align="center">
        {props.getTime(props.row.create_date_time)}
      </TableCell>
      <TableCell align="left">{props.row.name}</TableCell>
      <TableCell align="left">{props.row.phone}</TableCell>
      <TableCell align="center">{props.row.call}</TableCell>
      <TableCell align="center">{props.row.upp}</TableCell>
      <TableCell align="left">{props.row.theme.name}</TableCell>
      <TableCell align="left">
        <div
          className={styles.statusTable}
          style={{ 'color': color, 'background': background }}>
          {props.row.status.name}
        </div>
      </TableCell>
      <TableCell align="right">
        <EditIcon className='editIcon' onClick={(e) => { props.update(props.row) }} />
        <DeleteForeverIcon className='removeIcon' onClick={(e) => { props.remove(props.row) }} />
      </TableCell>

    </TableRow>
  )
}