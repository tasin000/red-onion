import React, { useRef } from 'react';
import logo from "./../../../../images/logo2.png";
import { Link, Navigate, useLocation } from 'react-router-dom';
import auth from '../../../../firebase/firebase.init';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
    ] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        alert(password)

        signInWithEmailAndPassword(email, password);
    }

    if (loginUser) {
        toast.success("User logged in successfully!");
        return <Navigate to={from} replace ></Navigate>
    }
    return (
        <div className="container">
            {loginLoading ? <h3>Loading...</h3> : loginError ? <h3>{loginError.message}</h3> : <></>}
            <div className='sign-up-container'>
                <img src={logo} alt="..." />

                <form onSubmit={handleLogin}>
                    <input ref={emailRef} type="email" name="email" id="email" placeholder='Email' required />
                    <input ref={passwordRef} type="password" name="password" id="password" placeholder='Password' required />
                    <input type="submit" value="Sign in" />
                </form>
                <Link to="/sign_up">Haven't registered yet?</Link>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Login;