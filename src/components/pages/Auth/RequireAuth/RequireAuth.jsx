import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../../../../firebase/firebase.init';

const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace />
};

export default RequireAuth;