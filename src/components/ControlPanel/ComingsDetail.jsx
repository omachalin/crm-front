import { Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Comings from '../../API/Comings';
import { getInitials } from '../../helpers/getIninitials';


function ComingsDetail(props) {
  const [theme, setTheme] = useState(props.client?.theme?.pk);
  const [status, setStatus] = useState(props.client?.status?.pk);
  const [upp, setUpp] = useState(props.client?.upp || (props.type === 'create' ? [] : ''));
  const [callFk, setCallFk] = useState(props.client?.call);
  const [themes, setThemes] = useState([])
  const [statuses, setStatuses] = useState([])
  const [uppPersonal, setUppPersonal] = useState([])
  const [callPersonal, setCallPersonal] = useState([])

  const themeChange = (event) => {
    setTheme(event.target.value)
    update(event)
  }

  const statusChange = (event) => {
    setStatus(event.target.value)
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
    Comings.getStatuses((data) => { setStatuses(data) })
    Comings.getThemes((data) => { setThemes(data) })
    Comings.getPersonal(setUppPersonal, 'upp')
    Comings.getPersonal(setCallPersonal, 'call')
  }, [])

  const update = (e) => {
    let key = e.target.name
    let value = e.target.value
    props.client[key] = value
  }

  console.log(props.client)

  return (
    <>
      {!!(themes.length && statuses.length) &&
        <Grid container align="center" spacing={2} onChange={(e) => update(e)}>
          <Grid item xs={12} md={6} >
            <TextField name="name" fullWidth defaultValue={props.client?.name} label="ФИО" variant="standard" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="phone" fullWidth defaultValue={props.client?.phone} label="Телефон" variant="standard" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Колл</InputLabel>
              <Select name="call_fk" style={{ textAlign: 'left' }}
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
                multiple={props.type === 'create'}
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
              <InputLabel>Статус</InputLabel>
              <Select name="status_fk" style={{ textAlign: 'left' }}
                value={status ? status : ""}
                onChange={statusChange}
                label="Статус"
              >

                {statuses.map((theme, index) => (
                  <MenuItem key={index} value={theme.pk}>{theme.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid >
      }
    </>
  );
}

export default ComingsDetail;
