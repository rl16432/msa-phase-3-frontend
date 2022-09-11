import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert, Box, Button, IconButton, SxProps } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/UserServices";
import styles from "../../styles/Login.module.css";
import LoginField from "./LoginField";
import { selectUserTeam, setUserTeam } from "./loginSlice";

interface LoginProps {
  sx: SxProps;
}

const Login = (props: LoginProps) => {
  const userTeam = useSelector(selectUserTeam);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>();
  // Whether to show the register/login buttons or the forms
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true);

  const displayAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 2000);
  };

  const onSelectLogin = (e: MouseEvent) => {
    action("selectLogin")(e);
    setLoginOrRegister(true);
    setShowForm(true);
  };
  const onSelectRegister = (e: MouseEvent) => {
    action("selectRegister")(e);
    setLoginOrRegister(false);
    setShowForm(true);
  };

  const onReturnToOptions = (e: MouseEvent) => {
    action("returnToOptions")(e);
    setShowForm(false);
  };

  const onLogin = (e: MouseEvent) => {
    // Storybook purposes
    action("attemptLogin")(e);

    if (userName != "") {
      userService
        .getUserPokemon(userName)
        .then((res) => {
          dispatch(setUserTeam(res));
          setUserName("");
        })
        .catch((err) => {
          displayAlert("Invalid username");
          console.log(err);
        });
    }
  };

  const onRegister = (e: MouseEvent) => {
    action("attemptRegister")(e);

    if (registerName != "") {
      userService
        .createUser(registerName)
        .then((res) => {
          dispatch(setUserTeam(res));
          setRegisterName("");
        })
        .catch((err) => {
          console.log(err);
          displayAlert(err?.response?.data);
        });
    }
  };

  const onLogout = (e: MouseEvent) => {
    action("logout")(e);
    setShowForm(false);
    dispatch(setUserTeam(undefined));
  };

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    loginOrRegister === true
      ? setUserName(e.target.value)
      : setRegisterName(e.target.value);
  };

  return (
    <>
      {userTeam == null ? (
        <>
          {showForm === false ? (
            <Box sx={{ ...props.sx }}>
              <Button
                data-testid="selectLogin"
                className={styles.loginButton}
                sx={{ mr: 1, color: "white" }}
                variant="outlined"
                onClick={onSelectLogin}
              >
                Login
              </Button>
              <Button
                data-testid="selectRegister"
                className={styles.loginButton}
                sx={{ mr: 1, color: "white" }}
                variant="outlined"
                onClick={onSelectRegister}
              >
                Register
              </Button>
            </Box>
          ) : (
            <>
              {alertMessage != null ? (
                <Alert
                  severity="error"
                  sx={{ py: 0, mx: 2, display: { md: "none" } }}
                >
                  {alertMessage}
                </Alert>
              ) : null}
              <Box sx={{ ...props.sx }}>
                {alertMessage != null ? (
                  <Alert
                    severity="error"
                    sx={{
                      py: 0,
                      ml: "auto",
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    {alertMessage}
                  </Alert>
                ) : null}
                <IconButton
                  data-testid="returnToOptions"
                  size="small"
                  onClick={onReturnToOptions}
                >
                  <ArrowBackIosNewIcon sx={{ color: "white" }} />
                </IconButton>
                <LoginField
                  inputProps={{
                    "data-testid": "loginField",
                  }}
                  sx={{
                    mx: 1,
                    display: "flex",
                  }}
                  size="small"
                  label="Username"
                  value={loginOrRegister === true ? userName : registerName}
                  onChange={onUserNameChange}
                />
                <Button
                  data-testid="attempt"
                  className={styles.loginButton}
                  sx={{ mr: 1, color: "white" }}
                  variant="outlined"
                  onClick={loginOrRegister === true ? onLogin : onRegister}
                >
                  {loginOrRegister === true ? "Login" : "Register"}
                </Button>
              </Box>
            </>
          )}
        </>
      ) : (
        <Box sx={{ ...props.sx }}>
          <Button
            sx={{ mx: 1 }}
            data-testid="logout"
            className={styles.loginButton}
            variant="outlined"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Login;
