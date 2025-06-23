import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '../../hooks/useAuthStore';

const Header = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className='flex justify-between items-center p-1'>
            <img className='w-42 h-10 object-cover' src="/retro-storm-oficial.png" alt="retro-storm" />
            <h2 className='text-xl font-bold font-mono'>My Retro Today</h2>
            <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">{user?.email || 'Usuário'}</span>
                <IconButton
                    sx={{ width: 40, height: 40, bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                    title="Perfil do usuário"
                >
                    <AccountCircle sx={{ fontSize: 28, color: 'grey.700' }} />
                </IconButton>
            </div>
        </div>
    )
}

export default Header;