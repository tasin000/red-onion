import React, { useState } from 'react';
import logo from "./.../../../../../../images/logo2.png";
import "./SignUp.css";
import { Link, Navigate } from 'react-router-dom';
import auth from '../../../../firebase/firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { sendEmailVerification } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [
        createUserWithEmailAndPassword,
        createUser,
        createLoading,
        createError,
    ] = useCreateUserWithEmailAndPassword(auth,);

    const [updateProfile, updateUpdating, updateError] = useUpdateProfile(auth);

    if (createUser) {
        toast.success("User created successfully")
        return <Navigate to="/" replace />
    }

    const handleInputBlur = (event) => {
        setUserInfo((old) => {
            const name = event.target.name;
            const previous = old;
            old[name] = event.target.value;
            return (previous);
        })
    }

    const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!nameRegex.test(userInfo.name)) {
            toast.error("Name is not valid");
            return;
        }

        if (!emailRegex.test(userInfo.email)) {
            toast.error("Email is not valid");
            return;
        }

        if (!passwordRegex.test(userInfo.password)) {
            toast.error("Password should contain:\n at least 6 character\none lowercase letter\none number");
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // console.log(userInfo);
        await createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        await updateProfile({ displayName: userInfo.name })
        const success = await sendEmailVerification();
        if (success) {
            toast.success("Verification email sent!");
        }
    }
    return (
        <div className="container">
            <div className='sign-up-container'>
                <img src={logo} alt="..." />
                {createLoading ? <h3>Loading...</h3> : createError ? <h3 style={{color: "red"}}>{createError.message}</h3> : <></>}
                <form onSubmit={handleSignUp}>
                    <input type="text" name="name" id="name" placeholder='Name' onBlur={handleInputBlur} />
                    <input type="text" name="email" id="email" placeholder='Email' onBlur={handleInputBlur} />
                    <input type="password" name="password" id="password" placeholder='Password' onBlur={handleInputBlur} />
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' onBlur={handleInputBlur} />
                    <input type="submit" value="Sign up" />
                </form>
                <Link to="/login">Already have an account</Link>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default SignUp;