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
import styles from './Table.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TableRowAgreement from './TableRowAgreement';
import Colspan from '../../../../components/Colspan/Colspan';
import AgreementsDetail from '../../../../components/ControlPanel/AgreementsDetail';
import FinanceModal from '../modal/Finance';


export default function TableAgreements(props) {
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

  const finance = (row) => {
    setModalTitle(`Финансовая детализация`)
    setModalContent(
      <Grid container align="center">
        <Grid item xs={12}>
          <FinanceModal
            agreement={row}
            addPayment={props.addPayment}
            removePayment={props.removePayment}
            schedule={props.schedule}
            index={0}
          />
        </Grid>
      </Grid>
    )

    setModalButtons(
      <>
        <Button onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
      </>
    )

    setModalStatus(true)
  }

  const update = (row) => {
    setModalTitle(`Редактирование договора`)
    setModalContent(
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <AgreementsDetail agreement={row} index={0} />
        </Grid>
      </Grid>
    )

    const getDissolutionBtn = () => {
      const btnFunc = () => {
        setModalStatus(false);
        props.OnUpdateAgreement(row)
      }

      if (row.dissolution)
        return <Button onClick={(e) => { row.dissolution = false; btnFunc() }}>В работу</Button>

      return <Button onClick={(e) => { row.dissolution = true; btnFunc() }}>Расторжение</Button>
    }

    setModalButtons(
      <>
        <Button onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        {getDissolutionBtn()}
        <Button onClick={(e) => {
          props.OnUpdateAgreement(row)
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
        <div className={styles.areYouSureUserName}>Договор №{row.number}</div>
        <div>будет безвозвратно удален</div>
      </Grid>

    )

    setModalButtons(
      <>
        <Button autoFocus onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        <Button onClick={(e) => {
          props.OnDeleteAgreement(row)
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
    if (navigator.userAgentData.mobile) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return hightWindow
  }


  let table = [];
  let dateAgreement = ''

  const tableRow = (row, index) => {
    let date = getDate(row.create_date_time)

    if (dateAgreement !== date) {
      dateAgreement = date
      table.push(
        <Colspan
          key={`${index}_date`}
          classes={styles.colSpanDateTd}
          colspan={13}
        >
          <Grid container spacing={2} style={{ height: '1.6rem' }}>
            <Grid align="center" item xs={12} md={12} >
              <div className={styles.colSpanValue}>{dateAgreement}</div>
            </Grid>
          </Grid>
        </Colspan>
      )
    }

    table.push(
      <TableRowAgreement
        key={index}
        row={row}
        getTime={getTime}
        finance={finance}
        update={update}
        remove={remove}
      />
    )
  }

  const addPage = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < (e.target.clientHeight + 50);
    if (bottom && !scrollTableEnd) {
      setScrollTableEnd(true)
      props.addPage()
    }
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
            {props.tbody.map((row, index) => (
              tableRow(row, index)
            ))}
            {table}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

