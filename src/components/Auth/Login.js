import React, { useState } from "react";
import { auth } from '../../firebase.js'
import { Link, useHistory } from 'react-router-dom';
import "./Auth.css";
import Register from './Register';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const updateError = (event) => {
        setError(event.target.value);
    }

    const submitForm = async (event) => {
        event.preventDefault();
        console.log("logging in...");

        try {
            await auth().signInWithEmailAndPassword(email, password);

            // redirect users to home once they're logged in
            history.push("/");

        } catch(currentError) {
            updateError(currentError);            
        }
    }
    
    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error">{error.message}</p>}
            <form onSubmit={ submitForm }>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={ email } 
                    onChange={ updateEmail } />
                  <label htmlFor="password">Password</label>
                <input type="text" id="password" value={ password } 
                    onChange={ updatePassword } />
                <button className="login-button">Login!</button>
                <p>Don't have an account yet? 
                    <Link className="register-button" to="/register">Go register</Link>
                </p>
            </form>
        </div>
    );
}