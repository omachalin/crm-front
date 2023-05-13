import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, TableContainer } from '@mui/material';
import styles from './Table.module.css';
import TableRowCashboxIncome from './TableRowCashboxIncome';
import Colspan from '../../../../components/Colspan/Colspan';
import { getDate } from '../../../../helpers/getDate';
import { Title } from '@mui/icons-material';

export default function TableCashboxIncome(props) {

  const tableRow = (data) => {
    const table = [];
    let dateCashboxIncome = null;
    data.forEach((row, index) => {
      let date = getDate(row.create_date_time)

      if (dateCashboxIncome !== date) {
        dateCashboxIncome = date
        table.push(
          <Colspan
            key={`${index}_date`}
            classes={styles.colSpanDateTd}
            colspan={13}
          >
            <Grid container spacing={2} style={{ height: '1.6rem' }}>
              <Grid align="center" item xs={12} md={12} >
                <div className={styles.colSpanValue}>{dateCashboxIncome}</div>
              </Grid>
            </Grid>
          </Colspan>
        )
      }

      table.push(
        <TableRowCashboxIncome
          key={index}
          index={index}
          row={row}
        />
      )
    })

    return table;
  }

  const classes = `tableCashbox ${styles.tableFixHead}`

  return (
    <div>
      <div className={styles.title}>Доходы</div>
      <TableContainer
        className={classes}
        component={Paper}>
        <Table
          stickyHeader sx={{ minWidth: 650 }}
          style={{ overflow: 'hidden' }} size="small"
          className={styles.tableCashbox}
        >
          <TableHead>
            <TableRow>
              {props.thead.map((th) =>
                <TableCell
                  align={th.position}
                  className={styles.tableFixHeadTh}
                  style={{ 'width': th.width }}
                  key={th.id}>{th.title}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRow(props.tbody)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

