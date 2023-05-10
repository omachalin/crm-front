import '../App.css';
import CounterLayout from '../components/Counter/CounterLayout';
import { Grid } from '@mui/material';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { useEffect, useState } from 'react';
import Comings from '../API/Comings';
import TableComing from '../modules/Comings/components/Table/Table';
import { getCounterComings } from '../modules/Comings/functions/setCounter';
import API from '../API/Global';

function ComingsPage() {
  const globalSettings = require('../settings.json');
  const [clients, setClients] = useState([])
  const [settings, setSettings] = useState([])
  const [counter, setCounter] = useState({})
  const [filterClient, setFilterClient] = useState({})
  const [pageClient, setPageClient] = useState(1)

  useEffect(() => {
    API.getSettings(globalSettings['coming_app'], (data) => { setSettings(data) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getCounter()
  }, [clients])

  useEffect(() => {
    Comings.getClients(pageClient, (data) => {
      (clients.length === 0)
        ? setClients(data['results'])
        : setClients([...clients, ...data['results']])
    }, filterClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageClient])


  const OnUpdateClient = (client) => {
    Comings.patchClient(client.client_fk, client, () => {
      Comings.patchComing(client.pk, client, (response) => {
        const newClients = clients.map((cl) => {
          if (cl.pk === response.pk) {
            cl = response
            cl['phone'] = response.client.phone
          }
          return cl
        });
        setClients(newClients)
      })
    })

  }

  const getCounter = () => {
    Comings.getCounter((data) => {
      setCounter(getCounterComings(data))
    })
  }

  const OnDeleteClient = (client) => {
    Comings.removeComing(client.pk)
    setClients(clients.filter(p => p.pk !== client.pk))
  }

  const OnCloneClient = (client) => {
    Comings.cloneClient(client.pk, (response) => {
      Comings.getClients(1, (data) => {
        setClients(data['results'])
        setPageClient(1)
      })
    })
  }

  const OnAddClient = (client) => {
    let newClient = { name: client.name, phone: client.phone }

    Comings.addClient(newClient, (responseClient) => {
      client['client_fk'] = responseClient['pk']
      Comings.addComing(client, (response) => {
        setClients([{...response, phone: responseClient.phone}, ...clients])
      })
    })
  }

  const OnSearchClient = (client) => {
    Comings.searchClient(client, (response) => {
      if (Object.keys(response).length === 0) {
        alert('Поиск не дал результатов!')
        return false;
      }

      setFilterClient(client)
      setClients(response['results'])
    })
  }

  const addPage = () => {
    setPageClient(pageClient + 1)
  }

  return (
    <div className="App">
      <CounterLayout counter={counter} />
      <ControlPanel
        create={OnAddClient}
        search={OnSearchClient}
        component={'comings'}
      />
      <Grid container>
        <Grid item xs>
          {!!(clients.length && Object.values(settings).length) &&
            <TableComing
              thead={settings.data['tableComingThead']}
              tbody={clients}
              OnUpdateClient={OnUpdateClient}
              OnDeleteClient={OnDeleteClient}
              OnCloneClient={OnCloneClient}
              addPage={addPage}
              getCounter={getCounter}
            />
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default ComingsPage;
