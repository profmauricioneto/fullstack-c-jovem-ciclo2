import useAuthStore from "../stores/useAuthStore";
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated()) {
        return <Navigate to={'/login'} replace/>
    }
    return children;
}

export default ProtectedRoutes;