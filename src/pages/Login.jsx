import React, { useContext } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { AuthContext } from '../context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthStore from '../API/AuthStore';


const LoginPage = () => {
  const paperStyle = { padding: 20, width: 280, margin: "6rem auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [passError, setPassError] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuth) {
      navigate("/comings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    await axios.post(`/token/`, user, { headers: { 'Content-Type': 'application/json' } },)
      .then(res => {
        if (res.status === 200) {
          setPassError(false)
          localStorage.clear();
          AuthStore.setTokens(res.data.access, res.data.refresh)
          setIsAuth(true)
        } else {
          setPassError(true)
        }
      })
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}></Avatar>
          <h2>Авторизация</h2>
        </Grid>

        <form onSubmit={submit}>
          <TextField
            label='ПИН'
            placeholder='Введите ПИН'
            variant="outlined"
            fullWidth
            required
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            style={{ marginTop: '5%' }}
            label='Пароль'
            placeholder='Введите пароль'
            type='password'
            variant="outlined"
            fullWidth
            required
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="Запомнить меня"
          />
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Войти</Button>
          {passError === true &&
            <div className='text-center mt-1 color-red'>Не верный логин или пароль!</div>
          }
        </form>
      </Paper>
    </Grid>
  )
}

export default LoginPage