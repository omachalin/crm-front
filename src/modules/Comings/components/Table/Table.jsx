import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableContainer } from '@mui/material';
import { useState } from 'react';
import ResponsiveDialog from '../../../../components/Modal/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ComingsDetail from '../../../../components/ControlPanel/ComingsDetail';
import styles from './Table.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TableRowComing from './TableRowComing';
import Colspan from '../../../../components/Colspan/Colspan';


export default function TableComing(props) {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState();
  const [modalButtons, setModalButtons] = useState();
  const [scrollTableEnd, setScrollTableEnd] = useState(false);

  const getTime = (date) => {
    let dateTime = new Date(date)
    let hourses = dateTime.getHours().toString()
    let minutes = dateTime.getMinutes().toString()
    if (minutes.length === 1) minutes = `0${minutes}`
    if (hourses.length === 1) hourses = `0${hourses}`
    return `${hourses}:${minutes}`
  }

  const getDate = (date) => {
    return (new Date(date).toLocaleString("ru", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    }));
  }

  const update = (row) => {
    setModalTitle('Редактирование клиента')
    setModalContent(
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <ComingsDetail client={row} index={0} />
        </Grid>
      </Grid>
    )

    setModalButtons(
      <>
        <Button onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        <Button onClick={(e) => {
          cloneClient(row)
          setModalStatus(false)
        }}>Вторичный приход</Button>
        <Button onClick={(e) => {
          props.OnUpdateClient(row)
          setModalStatus(false)
        }}>Сохранить</Button>
      </>
    )

    setModalStatus(true)
  }

  function remove(row) {
    setModalTitle('')
    setModalContent(
      <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minWidth: '22rem' }}>
        <ErrorOutlineIcon style={{ fontSize: '7rem' }} className={styles.colorRed} />
        <div className={styles.areYouSureRemoveModal}>Вы уверены?</div>
        <div className={styles.areYouSureUserName}>{row.name}</div>
        <div>будет безвозвратно удален</div>
      </Grid>

    )

    setModalButtons(
      <>
        <Button autoFocus onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        <Button onClick={(e) => {
          props.OnDeleteClient(row)
          setModalStatus(false)
        }}>Удалить</Button>
      </>
    )
    setModalStatus(true)
  }

  const setHightTable = () => {
    let hightWindow = window.innerHeight
    if (hightWindow > 1000) {
      hightWindow -= 236
    } else {
      hightWindow -= 202
    }

    return hightWindow
  }

  const getReportsComings = () => {
    let reports = []
    let dateComing = ''
    let date = ''

    props.tbody.forEach((row, index) => {
      date = getDate(row.create_date_time)

      if (dateComing !== date) {
        reports[date] = { comings: 0, first: 0, second: 0, agreement: 0, bk: 0, reject: 0 }
        dateComing = date
      }

      switch (row.status.name) {
        case 'Первичка': reports[date]['first'] += 1; break;
        case 'Вторичка': reports[date]['second'] += 1; break;
        case 'Договор': reports[date]['agreement'] += 1; break;
        case 'БК': reports[date]['bk'] += 1; break;
        case 'Брак': reports[date]['reject'] += 1; break;
        default: alert('Неизвестный тип статуса!'); break;
      }

      reports[date]['comings'] += 1
    })

    return reports
  }

  const getTableRow = () => {
    let date = ''
    let table = [];
    let dateComing = ''
    const reportsComings = getReportsComings()
    let number = 0

    props.tbody.forEach((row, index) => {
      date = getDate(row.create_date_time)

      if (dateComing !== date) {
        dateComing = date
        number = reportsComings[date]['comings'] + 1
        table.push(
          <Colspan
            key={`${index}_date`}
            classes={styles.colSpanDateTd}
            colspan={9}
          >
            <Grid container spacing={2} style={{ height: '1.6rem', position: 'relative' }}>
              <Grid align="left" item xs={6} md={6} >
                <div className={styles.colSpanValue}>
                  <span className={styles.mr_1_7rem}>Первичка: {reportsComings[date]['first']}</span>
                  <span className={styles.mr_1_7rem}>Вторичка: {reportsComings[date]['second']}</span>
                  <span className={styles.mr_1_7rem}>Договоры: {reportsComings[date]['agreement']}</span>
                  <span className={styles.mr_1_7rem}>БК: {reportsComings[date]['bk']}</span>
                  <span className={styles.mr_1_7rem}>Брак: {reportsComings[date]['reject']}</span>
                </div>

              </Grid>
              <Grid align="right" item xs={6} md={6}>
                <div style={{right: 0}} className={styles.colSpanValue}>{dateComing}</div>
              </Grid>
            </Grid>
          </Colspan>
        )

      }

      number -= 1
      table.push(
        <TableRowComing
          key={index}
          row={row}
          getTime={getTime}
          update={update}
          remove={remove}
          number={number}
        />
      )

    })

    return table
  }

  const addPage = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < (e.target.clientHeight + 50);
    if (bottom && !scrollTableEnd) {
      setScrollTableEnd(true)
      props.addPage()
    }
  }

  const cloneClient = (row) => {
    props.OnCloneClient(row)
    document.getElementsByClassName('tableComing')[0].scrollTop = 0;
    setScrollTableEnd(false)
  }


  const classes = `tableComing ${styles.tableFixHead}`

  return (
    <div>
      <ResponsiveDialog
        title={modalTitle}
        content={modalContent}
        buttons={modalButtons}
        status={modalStatus}
        setModalStatus={setModalStatus}
      />

      <TableContainer
        style={{ height: `${setHightTable()}px`, overflow: 'scroll' }}
        className={classes}
        component={Paper}
        onScroll={(e) => addPage(e)}>
        <Table
          stickyHeader sx={{ minWidth: 650 }}
          style={{ overflow: 'hidden' }} size="small"
          className={styles.tableComing}
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
            {getTableRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

