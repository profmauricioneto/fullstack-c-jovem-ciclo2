import React, { Fragment } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const theme = useTheme();
  const providers = [{ id: 'credentials', name: 'Email and password' }];

 const signIn = (providers, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email);
    console.log(password);
    login({email, password});
  }
 
  return (
    <Fragment>
      <AppProvider theme={theme}>
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{
            emailField: { autoFocus: false },
            form: { noValidate: true },
          }}
        />
      </AppProvider>
    </Fragment>
  );
}
