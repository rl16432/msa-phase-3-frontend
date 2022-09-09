import { Button, BoxProps, Typography, Alert, Box } from "@mui/material"
import React, { useState, ChangeEvent } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { selectUserTeam, setUserTeam } from "./loginSlice"
import userService from '../../services/UserServices'
import styles from '../../styles/Login.module.scss'
import LoginField from "./LoginField"

const Login = (props: BoxProps) => {
  const userTeam = useSelector(selectUserTeam)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string | null>()

  const displayAlert = (message: string) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 2000)
  }

  const onLogin = async () => {
    if (userName != '') {
      await userService.getUserPokemon(userName)
        .then(res => {
          dispatch(setUserTeam(res))
          setUserName('')
        })
        .catch(err => {
          displayAlert("Invalid username")
          console.log(err)
        })
    }
  }

  const onLogout = () => {
    dispatch(setUserTeam(undefined))
  }

  return (
    <>
      {userTeam == null
        ?
        <Box sx={{ ...props.sx }}>
          {alertMessage != null ? <Alert severity="error" sx={{ py: 0 }}>{alertMessage}</Alert> : null}
          <LoginField
            sx={{
              mx: 1,
              display: "flex"
            }}
            size="small"
            label="Username"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          />
          <Button className={styles.loginButton} sx={{ mr: 1, color: 'white' }} variant="outlined" onClick={onLogin}>
            Login
          </Button>
        </Box>
        :
        <Box sx={{ ...props.sx }}>
          <Button sx={{ mx: 1 }} className={styles.loginButton} color="error" variant="outlined" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      }
    </>
  )
}

export default Login