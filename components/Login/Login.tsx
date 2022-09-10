import { Button, BoxProps, Typography, Alert, Box } from "@mui/material"
import React, { useState, ChangeEvent } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { selectUserTeam, setUserTeam } from "./loginSlice"
import userService from '../../services/UserServices'
import styles from '../../styles/Login.module.css'
import LoginField from "./LoginField"

const Login = (props: BoxProps) => {
  const userTeam = useSelector(selectUserTeam)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState<string>('')
  const [registerName, setRegisterName] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string | null>()
  // Whether to show the register/login buttons or the forms
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true)

  const displayAlert = (message: string) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 2000)
  }

  const onLogin = () => {
    if (userName != '') {
      userService.getUserPokemon(userName)
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

  const onRegister = () => {
    if (registerName != '') {
      userService.createUser(registerName)
        .then(res => {
          dispatch(setUserTeam(res))
          setRegisterName('')
        })
        .catch(err => {
          console.log(err)
          displayAlert(err?.response?.data)
        })
    }
  }

  const onLogout = () => {
    setShowForm(false)
    dispatch(setUserTeam(undefined))
  }

  return (
    <>
      {userTeam == null
        ?
        <>
          {showForm === false
            ?
            <Box sx={{ ...props.sx }}>
              <Button className={styles.loginButton} sx={{ mr: 1, color: 'white' }}
                variant="outlined" onClick={() => {
                  setLoginOrRegister(true)
                  setShowForm(true)
                }}>
                Login
              </Button>
              <Button className={styles.loginButton} sx={{ mr: 1, color: 'white' }}
                variant="outlined" onClick={() => {
                  setLoginOrRegister(false)
                  setShowForm(true)
                }}>
                Register
              </Button>
            </Box>
            :
            <Box sx={{ ...props.sx }}>
              {alertMessage != null ? <Alert severity="error" sx={{ py: 0 }}>{alertMessage}</Alert> : null}
              <LoginField
                sx={{
                  mx: 1,
                  display: "flex"
                }}
                size="small"
                label="Username"
                value={(loginOrRegister === true) ? userName : registerName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  (loginOrRegister === true) ? setUserName(e.target.value) : setRegisterName(e.target.value)
                }}
              />
              <Button className={styles.loginButton} sx={{ mr: 1, color: 'white' }}
                variant="outlined" onClick={(loginOrRegister === true) ? onLogin : onRegister}>
                {(loginOrRegister === true) ? "Login" : "Register"}
              </Button>
            </Box>
          }
        </>
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