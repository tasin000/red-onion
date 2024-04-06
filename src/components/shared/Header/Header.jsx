import React from 'react';
import "./Header.css";
import logo from "./../../../images/logo2.png";
import cart from "../../../images/icons/cart.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../../../firebase/firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [loggedInUser, loggedInLoading, loggedInError] = useAuthState(auth);
    const navigate = useNavigate();
    return (
        <nav>
            <div className="container">
                <div className='navbar'>

                    <div className="nav-logo">
                        <img src={logo} alt="..." onClick={() => navigate("/")} />
                    </div>

                    <div className="nav-links">
                        <img src={cart} alt="..." onClick={() => navigate("/orders")} />
                        {loggedInLoading ? <p>Loading...</p> : !loggedInUser ? <><Link to="/login">Login</Link>
                            <Link to="/sign_up" className='pink-capsule-btn'>Sign up</Link></> : <Link className='pink-capsule-btn' onClick={() => signOut(auth)} style={{color: "#ffa500"}}>Sign Out</Link>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;