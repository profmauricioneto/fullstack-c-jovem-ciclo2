import React, { useEffect, useState } from "react";
import RetroDevPage from "./components/RetroDevPage";
import Login from "./components/Login";
import { useAuthStore } from "./hooks/useAuthStore";
import { toast } from 'react-toastify';

export default function App() {
  
  const isAuthorizated = useAuthStore((state) => state.isAuthorizated);
  const [hasShowWelcome, setHasShowWelcome] = useState(false);

  useEffect(() => {
    if (isAuthorizated && !hasShowWelcome) {
      toast.success('login successifuly', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setHasShowWelcome(true);
    }
  },[isAuthorizated, hasShowWelcome])

  if (!isAuthorizated) {
    return <Login />
  }

  return (
    <>
      <RetroDevPage />
    </>
  );
}
