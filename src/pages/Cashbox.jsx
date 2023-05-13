import { useEffect, useState } from "react";
import Cashbox from "../API/Cashbox";
import { getCounterCashbox } from "../modules/Cashbox/functions/setCounter";
import { Grid } from "@mui/material";
import TableCashboxIncome from "../modules/Cashbox/components/TableIncome/Table";
import CounterLayout from "../modules/Cashbox/components/Counter/CounterLayout";
import TableCashboxExpenses from "../modules/Cashbox/components/TableExpenses/Table";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import { SettingsContext, TypePaymentsContext, TypesMoneyContext } from "../context";
import API from "../API/Global";
const theadCashboxIncome = require('../modules/Cashbox/components/TableIncome/thead.json');
const theadCashboxExpenses = require('../modules/Cashbox/components/TableExpenses/thead.json');


function CashboxPage() {
  const [settings, setSettings] = useState({});
  const [counter, setCounter] = useState({})
  const [cashboxIncome, setCashboxIncome] = useState([])
  const [cashboxExpenses, setCashboxExpenses] = useState([])
  const [filterCashbox, setFilterCashbox] = useState({})

  useEffect(() => {
    API.getSettings('cashbox', (data) => { setSettings(settings => ({...settings, ...data})) })
    API.getSettings('general', (data) => { setSettings(settings => ({...settings, ...data})) })
    getCounter()
  }, [])

  useEffect(() => {

    if (settings.type_payment_fk_agreement_status) {
      const incomeTypePayments = {type_payment_fk: [settings.type_payment_fk_agreement_status, settings.type_payment_fk_transport_status]};

      Cashbox.getCashbox({...filterCashbox, ...incomeTypePayments}, (data) => {
        setCashboxIncome(data?.results || [])
      })

      const expensesTypePayments = {type_payment_fk: settings.type_payment_fk_expenses_status};

      Cashbox.getCashbox({...filterCashbox, ...expensesTypePayments}, (data) => {
        setCashboxExpenses(data?.results || [])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, filterCashbox])

  const getCounter = () => {
    Cashbox.getCounter((data) => {
      setCounter(getCounterCashbox(data))
    })
  }

  // const addCashbox = (data) => {
  //   Cashbox.addMoney(data, (response) => {
  //     const newAgreement = agreements.map((cl) => {
  //       if (cl.pk === data.agreement_fk)
  //         cl['cashboxes'].unshift(response)
  //       return cl
  //     });
  //     setAgreements(newAgreement);
  //     //console.log(agreements)
  //   })
  // }

  // useEffect(() => {
  //   Agreements.getAgreements(pageAgreement, (data) => {
  //     (data.length === 0)
  //       ? setAgreements(data['results'])
  //       : setAgreements([...agreements, ...data['results']])
  //   }, filterAgreement)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageAgreement])

  const handleAddCashbox = (cashbox) => {
    Cashbox.addCashbox(cashbox)
  }

  const handleSearchCashbox = (params) => {
      setFilterCashbox(params)
  }

  return (
    <SettingsContext.Provider value={settings}>
      <div className="App">
        <CounterLayout counter={counter} />
        <ControlPanel
            create={handleAddCashbox}
            search={handleSearchCashbox}
            component={'cashbox'}
          />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {!!cashboxIncome.length &&
                  <TableCashboxIncome
                    thead={theadCashboxIncome.tableCashboxIncomeThead}
                    tbody={cashboxIncome}
                  />
            }
          </Grid>
          <Grid item xs={12} md={5}>
            {!!cashboxIncome.length &&
              <TableCashboxExpenses
                thead={theadCashboxExpenses.tableCashboxExpensesThead}
                tbody={cashboxExpenses}
              />
            }
          </Grid>
        </Grid>
      </div>
    </SettingsContext.Provider>
  )
}

export default CashboxPage;
