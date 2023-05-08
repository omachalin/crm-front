import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


export default function Colspan({classes, colspan, children}) {
  return (
    <TableRow>
      <TableCell className={classes} colSpan={colspan}>
        {children}
      </TableCell>
    </TableRow>
  )
}