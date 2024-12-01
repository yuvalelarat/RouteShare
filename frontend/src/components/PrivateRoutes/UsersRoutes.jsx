import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const UsersRoutes = ({ children }) => {
    const token = useSelector((state) => state.userData.token);

    if (!token || token === '') {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default UsersRoutes;
