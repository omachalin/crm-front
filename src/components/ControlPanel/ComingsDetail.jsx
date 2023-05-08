import { Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Comings from '../../API/Comings';


function ComingsDetail(props) {
  const [theme, setTheme] = useState(props.client?.theme?.pk);
  const [status, setStatus] = useState(props.client?.status?.pk);
  const [themes, setThemes] = useState([])
  const [statuses, setStatuses] = useState([])

  const themeChange = (event) => {
    setTheme(event.target.value)
    update(event)
  }

  const statusChange = (event) => {
    setStatus(event.target.value)
    update(event)
  }

  useEffect(() => {
    Comings.getStatuses((data) => { setStatuses(data) })
    Comings.getThemes((data) => { setThemes(data) })
  }, [])

  const update = (e) => {
    let key = e.target.name
    let value = e.target.value
    props.client[key] = value
  }

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
            <TextField name="call" fullWidth defaultValue={props.client?.call} label="Колл" variant="standard" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="upp" fullWidth defaultValue={props.client?.upp} label="ЮПП" variant="standard" />
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
