import { useEffect, useState } from "react";
import Agreements from "../API/Agreements";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import CounterLayout from "../components/Counter/CounterLayout";
import { getCounterAgreements } from "../modules/Agreements/functions/setCounter";
import API from '../API/Global';
import { Grid } from '@mui/material';
import TableAgreements from "../modules/Agreements/components/Table/Table";
import Comings from "../API/Comings";
import Cashbox from "../API/Cashbox";
import { TypePaymentsContext, TypesMoneyContext } from "../context";


function AgreementsPage() {
  const [counter, setCounter] = useState({})
  const [agreements, setAgreements] = useState([])
  const [pageAgreement, setPageAgreement] = useState(1)
  const globalSettings = require('../settings.json');
  const [settings, setSettings] = useState([])
  const [typePayments, setTypePayments] = useState([])
  const [typesMoney, setTypesMoney] = useState([])
  const [filterAgreement, setFilterAgreement] = useState({})

  useEffect(() => {
    API.getSettings(globalSettings['agreement_app'], (data) => { setSettings(data) })
    setCounter(getCounterAgreements)
    getTypePayments()
    getTypesMoney()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (agreements.length !== 0) {
      console.log(agreements)
      console.log(1)
      getCounter()
    }
  }, [agreements])

  function OnSearchAgreement(client) {
    Agreements.searchAgreement(client, (response) => {
      if (Object.keys(response).length === 0) {
        alert('Поиск не дал результатов!')
        return false;
      }

      setFilterAgreement(client)
      setAgreements(response['results'])
    })
  }

  const getTypePayments = () => {
    Cashbox.getTypePayments((data) => {
      setTypePayments(data)
    })
  }

  const getTypesMoney = () => {
    Cashbox.getTypesMoney((data) => {
      setTypesMoney(data)
    })
  }

  const addPage = () => {
    setPageAgreement(pageAgreement + 1)
  }

  const addPayment = (data) => {
    Cashbox.addMoney(data, (response) => {
      const newAgreement = agreements.map((cl) => {
        if (cl.pk === data.agreement_fk)
          cl['cashboxes'].unshift(response)
        return cl
      });
      setAgreements(newAgreement);
      //console.log(agreements)
    })
  }

  useEffect(() => {
    Agreements.getAgreements(pageAgreement, (data) => {
      (data.length === 0)
        ? setAgreements(data['results'])
        : setAgreements([...agreements, ...data['results']])
    }, filterAgreement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageAgreement])

  function removeAgreement(agreement) {
    Agreements.removeAgreement(agreement.pk)
    setAgreements(agreements.filter(p => p.pk !== agreement.pk))
  }

  function updateAgreement(params) {
    Comings.patchComing(params['coming']['pk'], params, () => {
      Comings.patchClient(params['coming']['client']['pk'], params, () => {
        Agreements.patchAgreement(params.pk, params, (response) => {
          const newAgreement = agreements.map((cl) => {
            if (cl.pk === response.pk)
              cl = response
            return cl
          });
          setAgreements(newAgreement)
        })
      })
    })
  }

  function removePayment(payment_pk, agreement_pk) {
    if (!window.confirm('Вы действительно хотите удалить платеж?'))
      return false
    Cashbox.removePayement(payment_pk, () => {
      const newAgreement = agreements.map((cl) => {
        if (cl.pk === agreement_pk) {
          cl['cashboxes'].forEach(function (element, index, object) {
            if (element.pk === payment_pk)
              object.splice(index, 1)
          })
        }
        return cl
      });
      setAgreements(newAgreement)
    })

  }

  const getCounter = () => {
    Agreements.getCounter((data) => {
      setCounter(getCounterAgreements(data))
    })
  }

  return (
    <div className="App">
      <CounterLayout counter={counter} />
      <ControlPanel
        search={OnSearchAgreement}
        component={'agreements'}
      />
      <Grid container>
        <Grid item xs>
          {!!(agreements.length && Object.values(settings).length) &&
            <TypePaymentsContext.Provider value={{
              typePayments,
            }}>
              <TypesMoneyContext.Provider value={{
                typesMoney,
              }}>
                <TableAgreements
                  thead={settings.data['tableAgreementThead']}
                  tbody={agreements}
                  OnUpdateAgreement={updateAgreement}
                  OnDeleteAgreement={removeAgreement}
                  addPayment={addPayment}
                  addPage={addPage}
                  removePayment={removePayment}
                // getCounter={getCounter}
                />
              </TypesMoneyContext.Provider>
            </TypePaymentsContext.Provider>
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default AgreementsPage;