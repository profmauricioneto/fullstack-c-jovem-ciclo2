import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import React, { Fragment, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

export default function Login() {
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const login = useAuthStore((state) => state.login);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (errorEmail || errorPassword) {
      return;
    } else {
      const userData = new FormData(event.currentTarget);
      const email = userData.get('email');
      const password = userData.get('password');
      login({email, password})
    }
  };

  const validateInputs = () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    let isValid = true;
    
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setErrorEmail(true);
        setErrorEmailMessage('Entre com um e-mail correto!');
        isValid = false;
    } else {
        setErrorEmailMessage('');
        setErrorEmail(false);
    }

    if (!password.value || password.value.length <= 6) {
        setErrorPassword(true);
        setErrorPasswordMessage('A senha deve ter no mínimo 6 caracteres')
        isValid = false;
    } else {
        setErrorPasswordMessage('');
        setErrorPassword(false);
    }

    return isValid;
  }

  return (
    <Fragment>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={onHandleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <TextField
              error={errorEmail}
              helperText={errorEmailMessage}
              id="email"
              type="email"
              name="email"
              label="Email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={errorEmail ? "error" : "primary"}
            />
            <TextField
              error={errorPassword}
              helperText={errorPasswordMessage}
              name="password"
              label="Password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={errorPassword ? "error" : "primary"}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Entrar
            </Button>
          </Box>
        </Card>
      </Box>
    </Fragment>
  );
}
