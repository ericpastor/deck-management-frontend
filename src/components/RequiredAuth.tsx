import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface RequireAuthProps {
    element: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ element }) => {
    useAuth();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default RequireAuth;
