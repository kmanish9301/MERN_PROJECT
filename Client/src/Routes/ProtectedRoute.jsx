import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './../CommonComponents/utils';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // Render the child components if authenticated
};

export default ProtectedRoute;
