import { Grid, TextField } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ReactVirtualizedTable from '../../../../components/Table/TableFixHead';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useContext, useState } from 'react';
import { TypePaymentsContext } from '../../../../context';
import modalStyles from './modal.module.css'
import { Libs } from '../../../../Libs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const settings = require('../../../../settings.json');


export default function FinanceModal(props) {
  const { typePayments } = useContext(TypePaymentsContext)
  const [money, setMoney] = useState('1')
  const [typePayment, setTypePayment] = useState()
  const [errorTypePayment, setErrorTypePayment] = useState(false)

  const typePaymentChange = (e) => {
    setErrorTypePayment(false)
    setTypePayment(e.target.value)
  }

  const getSchedule = () => {
    let cashboxes = [...props.agreement.cashboxes]
    let schedule = []
    cashboxes.forEach(function (element) {
      schedule.unshift({
        'name': Libs.getRusDateTime(element.create_date_time),
        'Сумма': element.money,
      })
    })

    return schedule
  }

  const moneyChange = (e) => {
    const value = e.target.value
    if (parseInt(value))
      setMoney(value)
    else
      setMoney('')
  }

  const addMoney = () => {
    if (!typePayment) {
      setErrorTypePayment(true)
      return false
    }

    props.addPayment({
      'name': props.agreement.coming.name,
      'money': money,
      'type_payment_fk': typePayment,
      'agreement_fk': props.agreement.pk,
    })
  }

  const tableHead = [
    {
      width: 1,
      label: '#',
      dataKey: 'id',
    },
    {
      width: 70,
      label: 'Сумма',
      dataKey: 'money',
      numeric: true,
    },
    {
      width: 140,
      label: 'Тип платежа',
      dataKey: 'type',
      numeric: false,
    },
    {
      width: 120,
      label: 'Дата и время',
      dataKey: 'date',
      numeric: false,
    },
    {
      width: 30,
      label: '',
      dataKey: 'remove',
      numeric: false,
    },
  ];

  const remainderMoney = (agreement) => {
    let moneyAgreement = 0
    let moneyTransport = 0

    agreement.cashboxes.forEach(function (element) {
      if (element.type_payment_fk === settings.statuses.agreements.paid_agreement) // Если оплата договора
        moneyAgreement += element.money
      else if (element.type_payment_fk === settings.statuses.agreements.paid_transport) // Если оплата ТР
        moneyTransport += element.money
    })

    return {
      'moneyAgreement': moneyAgreement,
      'moneyTransport': moneyTransport,
    }
  }

  const setRows = (rows) => {
    let result = []
    rows.forEach(function (element, index) {
      result.push(
        {
          'id': (index + 1),
          'money': element.money.toLocaleString(),
          'type': element.type_payment.name,
          'date': Libs.getRusDateTime(element.create_date_time),
          'remove': <DeleteForeverIcon
            className='removeIcon'
            onClick={(e) => { props.removePayment(element.pk, props.agreement.pk) }}
          />
        }
      )
    });

    return result
  }

  return (
    <Grid container align="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container className={modalStyles.financeBlock}>
          <Grid item xs={6} md={6}>
            <div align="center" className={modalStyles.financeBlockLabel}>
              <div>Сумма договора</div>
              <div style={{ fontSize: '25px' }}>{(props.agreement?.price).toLocaleString('ru')}</div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div align="center" className={modalStyles.financeBlockLabel}>
              <div>Остаток</div>
              <div style={{ fontSize: '25px' }}>
                {
                  (props.agreement.price - remainderMoney(props.agreement)['moneyAgreement'])
                    .toLocaleString('ru')
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container className={modalStyles.financeBlock}>
          <Grid item xs={6} md={6}>
            <div align="center" className={modalStyles.financeBlockLabel}>
              <div>ТР</div>
              <div style={{ fontSize: '25px' }}>{(props.agreement?.price_transport).toLocaleString('ru')}</div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div align="center" className={modalStyles.financeBlockLabel}>
              <div>Остаток</div>
              <div style={{ fontSize: '25px' }}>
                {
                  (props.agreement.price_transport - remainderMoney(props.agreement)['moneyTransport'])
                    .toLocaleString('ru')
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        График платежей
        <div style={{ position: 'relative', width: '95%', paddingBottom: '15%' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              height: '6rem',
              right: 0,
              bottom: 0,
              top: 0,
            }}
          >
            <ResponsiveContainer>
              <LineChart data={getSchedule()}>
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="Сумма" stroke="#1976d2" yAxisId={0} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="standard">
          <InputLabel>Тип платежа</InputLabel>
          <Select name="type_payment_fk" style={{ textAlign: 'left' }}
            value={typePayment ? typePayment : ""}
            onChange={typePaymentChange}
            label="тип платежа"
          >
            {typePayments.map((typePayment, index) => (
              <MenuItem key={index} value={typePayment.pk}>{typePayment.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {(errorTypePayment === true) &&
          <InputLabel className='errorInput'>Поле должно быть заполнено!</InputLabel>
        }
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField name="money" onChange={moneyChange}
          InputProps={{ endAdornment: <AddCircleIcon className='addMoneyIcon' onClick={addMoney} /> }}
          type="number"
          fullWidth value={money} label="Сумма" variant="standard"
        />
        {(money === '') &&
          <InputLabel className='errorInput'>Поле должно быть заполнено!</InputLabel>
        }
      </Grid>


      <Grid item xs={12} align="center" style={{ marginTop: '3%' }}>
        <ReactVirtualizedTable
          tableHead={tableHead}
          rows={props.agreement.cashboxes}
          setRows={setRows}
        />
      </Grid>
    </Grid >
  )
}