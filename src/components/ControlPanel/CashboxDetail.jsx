import { Grid, Select, TextField } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as fns from "date-fns";
import { getInitials } from '../../helpers/getIninitials';
import Personal from '../../API/Personal';
import { SettingsContext } from '../../context';
import Cashbox from '../../API/Cashbox';
import { MuiDateRangePicker } from '../MuiDateRangePicker/MuiDateRangePicker';


function CashboxDetail(props) {
  const settings = useContext(SettingsContext)
  const [upp, setUpp] = useState(props.agreement?.upp);
  const [uppPersonal, setUppPersonal] = useState([])
  const [typePayment, setTypePayment] = useState([])
  const [typeMoney, setTypeMoney] = useState([])
  const [typesPayment, setTypesPayment] = useState([])
  const [typesMoney, setTypesMoney] = useState([])

  useEffect(() => {
    Personal.getPersonal(setUppPersonal, settings.fk_department_upp, settings.fk_status_working)
    getTypesPayment()
    getTypesMoney()
  }, [])

  const uppChange = (event) => {
    setUpp(event.target.value)
    update(event)
  }

  const typePaymentChange = (event) => {
    setTypePayment(event.target.value)
    update(event)
  }

  const typeMoneyChange = (event) => {
    setTypeMoney(event.target.value)
    update(event)
  }

  const getTypesPayment = () => {
    Cashbox.getTypePayments((data) => {
      setTypesPayment(data)
    })
  }

  const getTypesMoney = () => {
    Cashbox.getTypesMoney((data) => {
      setTypesMoney(data)
    })
  }

  const update = (e) => {
    let key = e.target.name
    let value = e.target.value
    props.cashbox[key] = value
  }

  const handleDateRangeChange = (dateRange) => {
    console.log(dateRange)
    if (dateRange.startDate) {
      props.cashbox.create_date_time_after = fns.format(dateRange.startDate, "yyyy-MM-dd")
    }

    if (dateRange.endDate && dateRange.endDate != dateRange.startDate) {
      props.cashbox.create_date_time_before = fns.format(dateRange.endDate, "yyyy-MM-dd")
    }
  }

  console.log(uppPersonal, typesMoney, typesPayment)

  return (
    <>
      {!!(uppPersonal.length && typesPayment.length && typesMoney.length) &&
        <Grid container align="center" spacing={2} onChange={(e) => update(e)}>
          <Grid item xs={12} md={6} >
            <TextField
              name="name" fullWidth
              defaultValue={props.cashbox?.name}
              label="Наименование" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="money" fullWidth
              defaultValue={props.cashbox?.money}
              label="Сумма" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Тип оплаты</InputLabel>
              <Select name="type_payment_fk" style={{ textAlign: 'left' }}
                value={typePayment ? typePayment : ""}
                label="Тип оплаты"
                onChange={typePaymentChange}
              >
                {typesPayment.map((typePayment, index) => (
                  <MenuItem key={index} value={typePayment.pk}>{getInitials(typePayment.name)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Вид оплаты</InputLabel>
              <Select name="type_money_fk" style={{ textAlign: 'left' }}
                value={typeMoney ? typeMoney : ""}
                label="Вид оплаты"
                onChange={typeMoneyChange}
              >
                {typesMoney.map((typeMoney, index) => (
                  <MenuItem key={index} value={typeMoney.pk}>{getInitials(typeMoney.name)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {props.type === 'search' && <>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel>ЮПП</InputLabel>
                <Select name="upp" style={{ textAlign: 'left' }}
                  value={upp ? upp : ""}
                  label="ЮПП"
                  onChange={uppChange}
                >
                  {uppPersonal.map((uppPersonal, index) => (
                    <MenuItem key={index} value={uppPersonal.pk}>{getInitials(uppPersonal.name)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="standard">
                <MuiDateRangePicker onDateRangeChange={handleDateRangeChange}/>
              </FormControl>
            </Grid>
          </>}
        </Grid>
      }
    </>
  );
}

export default CashboxDetail;
