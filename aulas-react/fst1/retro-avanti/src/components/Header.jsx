import React from "react";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useAuthStore } from "../hooks/useAuthStore";

export default function Header() {

  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="flex justify-between items-center p-1">
        <img className="w-50 h-10 object-cover rounded-lg" src="/retro-avanti-logo-2.png" alt="LOGO-RETRO-AVANTI" />
        <h2 className="text-xl font-bold font-mono">My Current Retro</h2>
        <div>
          <span className="text-gray-600 font-medium">{user?.email || 'Undefined User'}</span>
          <IconButton
            size="small"
            sx={{ ml: 2, width: 40, bgcolor: 'gray.200',  '&hover': {bgcolor: 'gray.300'}}}
          >
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
        </div>
      </div>
    </>
  );
}
