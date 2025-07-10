import React, { Fragment } from "react";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useAuthStore } from "../hooks/useAuthStore";


export default function Header() {

    const user = useAuthStore((state) => state.user)

    return(
        <Fragment>
            <div className="flex justify-between items-center p-1">
                <img className="h-20 w-40 object-cover" src="/logo-easyretro.png" alt="RETRODEV-LOGO" />
                <h2 className="text-xl font-bold font-mono">My Current Retrospective</h2>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">{user?.email || 'undefined user'}</span>
                    <IconButton 
                        sx={{ width: 40, height: 40, bgColor: 'gray.200', '&hover': {bgColor: 'gray.300'}}}
                        title="User Account"
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                    </IconButton>
                </div>
            </div>
        </Fragment>
    )
}