import { Grid, TextField } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Comings from '../../API/Comings';
import Agreements from '../../API/Agreements';
import { getInitials } from '../../helpers/getIninitials';
import Personal from '../../API/Personal';
import { SettingsContext } from '../../context';


function AgreementsDetail(props) {
  const settings = useContext(SettingsContext)
  const [theme, setTheme] = useState(props.agreement.coming?.theme_fk);
  const [themes, setThemes] = useState([])
  const [services, setServices] = useState([])
  const [service, setService] = useState(props.agreement?.service_fk)
  const [upp, setUpp] = useState(props.agreement?.upp);
  const [callFk, setCallFk] = useState(props.agreement?.call);
  const [uppPersonal, setUppPersonal] = useState([])
  const [callPersonal, setCallPersonal] = useState([])

  const themeChange = (event) => {
    setTheme(event.target.value)
    update(event)
  }

  const serviceChange = (event) => {
    setService(event.target.value)
    update(event)
  }

  const uppChange = (event) => {
    setUpp(event.target.value)
    update(event)
  }

  const callChange = (event) => {
    setCallFk(event.target.value)
    update(event)
  }

  useEffect(() => {
    Comings.getThemes((data) => { setThemes(data) })
    Agreements.getServices((data) => { setServices(data) })
    Personal.getPersonal(setUppPersonal, settings.fk_department_upp, settings.fk_status_working)
    Personal.getPersonal(setCallPersonal, settings.fk_department_call, settings.fk_status_working)
  }, [])

  const update = (e) => {
    let key = e.target.name
    let value = e.target.value
    props.agreement[key] = value
  }

  return (
    <>
      {!!(services.length && themes.length) &&
        <Grid container align="center" spacing={2} onChange={(e) => update(e)}>
          <Grid item xs={12} md={6} >
            <TextField
              name="name" fullWidth
              defaultValue={props.agreement?.coming?.name}
              label="ФИО" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phone" fullWidth
              defaultValue={props.agreement?.coming?.client?.phone}
              label="Телефон" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="number"
              fullWidth defaultValue={props.agreement?.number} label="Номер договора" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Тематика</InputLabel>
              <Select name="theme_fk" style={{ textAlign: 'left' }}
                value={theme ? theme : ""}
                onChange={themeChange}
                label="Тематика"
              >
                {themes.map((theme, index) => (
                  <MenuItem key={index} value={theme.pk}>{theme.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Колл</InputLabel>
              <Select name="call" style={{ textAlign: 'left' }}
                value={callFk ? callFk : ""}
                label="Колл"
                onChange={callChange}
              >
                {callPersonal.map((callPersonal, index) => (
                  <MenuItem key={index} value={callPersonal.pk}>{getInitials(callPersonal.name)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
            <TextField name="price"
              type="number"
              fullWidth defaultValue={props.agreement?.price} label="Сумма" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="price_transport"
              type="number"
              fullWidth
              defaultValue={props.agreement?.price_transport}
              label="Транспортные расходы" variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Сервис</InputLabel>
              <Select name="service_fk" style={{ textAlign: 'left' }}
                value={service ? service : ""}
                onChange={serviceChange}
                label="Сервис"
              >
                {services.map((service, index) => (
                  <MenuItem key={index} value={service.pk}>{service.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="note"
              fullWidth defaultValue={props.agreement?.note} label="Примечание" variant="standard"
            />
          </Grid>

        </Grid>
      }
    </>
  );
}

export default AgreementsDetail;
