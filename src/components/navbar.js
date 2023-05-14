import React from "react";
import { useSelector } from "react-redux";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


const NavBar = () => {
    const [user] = useAuthState(auth);
    const cart = useSelector((state) => state.cart.cart);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
  
    const signOut = () => {
        auth.signOut();
    };

    const getTotalQuantity = () => {
    let total = 0
    if (cart && cart.length) {
        cart.forEach((item) => {
          total += item.quantity;
        });
    }
    return total
    }
    
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Offcanvas dark navbar</a>
                    <div className="navbar-nav ms-auto mx-2">
                        <Link to={`/cart`} className="nav-link text-end" href="/cart">
                        <i className="bi bi-cart-fill me-2"></i>
                        {getTotalQuantity() || 0}
                        </Link>
                    </div>
                    {user ? (
                    <button onClick={signOut} className="sign-out" type="button">
                        Sign Out
                    </button>
                    ) : (
                    <button className="sign-in">
                        <img
                        onClick={googleSignIn}
                        src={GoogleSignin}
                        alt="sign in with google"
                        type="button"
                        />
                    </button>
                    )}
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    {user?.uid === "SY0Kw0dqeReO6CqOy4mCFmxUXVf1" ? (
                    <li className="nav-item">
                        <Link className="nav-link" to="/operatorchat" >OperatorChat</Link>
                    </li>
                    ) : <></>}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    </ul>
                    <form className="d-flex mt-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar ;