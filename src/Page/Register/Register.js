import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Register.css';



const Register = () => {

    // Taking Values From USE CONTEXT>>>
    const { emailSignUp, setUserNameAndPhoto, googleLogin } = useContext(AuthContext);



    
    // Getting location system.
    const location = useLocation();

    // Getting Location.
    const from = location.state?.from?.pathname || '/'; 


    
    // navigate system 
    const navigate = useNavigate();



    // Error State For Sign UP System
    const [error, setError] = useState("Already have an account?");



    // Handler For Taking USER INFO FROM Form Start.
    const singUpHandler = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        //   Regular Expression Password Checking Start
        if (password.length < 5) {
            return setError("Password should be at least 6 character!");
        }

        if (!/[@#^&*$#@%]/.test(password)) {
            return setError("Please add at least one Special Character!");
        }
        //   Regular Expression Password Checking End


        if (confirm !== password) {
            return alert("Password are not Match!");
        }



        // SignUP Using EMAIL start
        emailSignUp(email, password)
            .then(() => {
                // Alert For the Verification Check.
                alert("Please Check your Email!");



                //*Set User NAME AFTER Create The ACCOUNT 
                // Reset Form ALSO
                setUserNameAndPhoto(name)
                    .then(() => form.reset())
                    .catch(error => console.log(error));

            })
            .catch(error => alert(error));
        // SignUP Using EMAIL End

    }
    // Handler For Taking USER INFO FROM Form End.


    // Login with google Start
    const loginWithGoogle = ()=> 
    {
        googleLogin()
        .then(()=> navigate(from, {replace: true})
        .catch(error=> console.log(error)))
    }
    // Login with google End






    return (
        <div className='register-from'>

        <Helmet><title>Register</title></Helmet>

            <form onSubmit={singUpHandler}>
                <h1 className='header'>Sign Up</h1>

                <div className='name-filed'>
                    <p>Name</p>
                    <input required name='name' type="text" />
                </div>
                <div className='email-filed'>
                    <p>Email</p>
                    <input required name='email' type="text" />
                </div>

                <div className='password-filed'>
                    <p>Password</p>
                    <input required name='password' type="password" />
                </div>
                <div className='password-filed'>
                    <p>Confirm Password</p>
                    <input required name='confirm' type="password" />
                </div>

                <button className='submit'>Sign Up</button>
                <div className='register-box'>
                    <p>{error}</p> <Link to='/login'>Login</Link>
                </div>

                <div className='or-section' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <hr /> <p style={{ textAlign: 'center' }}>or</p> <hr />
                </div>

            </form>
             <button onClick={loginWithGoogle} className='google-login-btn'>Continue With Google</button>
        </div>
    );
};

export default Register;