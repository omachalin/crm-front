import { useEffect, useState } from "react";
import Cashbox from "../API/Cashbox";
import { getCounterCashbox } from "../modules/Cashbox/functions/setCounter";
import { Grid } from "@mui/material";
import CounterLayout from "../modules/Cashbox/components/Counter/CounterLayout";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import { SettingsContext } from "../context";
import API from "../API/Global";
import TableContainerExpenses from "../modules/Cashbox/components/Table/Expenses/TableContainerExpenses";
import TableContainerIncome from "../modules/Cashbox/components/Table/Income/TableContainerIncome";

function CashboxPage() {
  const [settings, setSettings] = useState({});
  const [counter, setCounter] = useState({})
  const [cashboxIncome, setCashboxIncome] = useState([])
  const [cashboxExpenses, setCashboxExpenses] = useState([])
  const [filterCashbox, setFilterCashbox] = useState({page: 1})

  useEffect(() => {
    API.getSettings('cashbox', (data) => { setSettings(settings => ({...settings, ...data})) })
    API.getSettings('general', (data) => { setSettings(settings => ({...settings, ...data})) })
    getCounter()
  }, [])

  const getCounter = () => {
    Promise.all([Cashbox.getCounter(), Cashbox.getCounterGraph()]).then(([counter, counterGraph]) => {
      const normalizeGrphData = Object.entries(counterGraph).reverse().map(([key, value]) => ({date: key, ...value}))
      setCounter(getCounterCashbox({...counter, graph: normalizeGrphData}))
    })
  }

  const handleAddCashbox = (cashbox) => {
    Cashbox.addCashbox(cashbox, (data) => {
      console.log(data)
      if (data.type_payment_fk === settings.type_payment_fk_expenses_status) {
        setCashboxExpenses(expenses => [data, ...expenses])
      } else {
        setCashboxIncome(income => [data, ...income])
      }
    })
  }

  const handleSearchCashbox = (params) => {
      setFilterCashbox({...params, page: 1})
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
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={7}>
            {!!settings.type_payment_fk_agreement_status &&
              <TableContainerIncome
                filterCashbox={filterCashbox}
                cashboxIncome={cashboxIncome}
                setCashboxIncome={setCashboxIncome}
              />
            }
          </Grid>
          <Grid item xs={12} md={5}>
            {!!settings.type_payment_fk_expenses_status &&
              <TableContainerExpenses
                filterCashbox={filterCashbox}
                cashboxExpenses={cashboxExpenses}
                setCashboxExpenses={setCashboxExpenses}
              />
            }
          </Grid>
        </Grid>
      </div>
    </SettingsContext.Provider>
  )
}

export default CashboxPage;
