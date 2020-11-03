import React, { useState } from "react";
import { auth } from '../../firebase.js'
import { Link, useHistory } from 'react-router-dom';
import "./Auth.css";
import Login from './Login';


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

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
        console.log("submitting form...");

        try {
            await auth().createUserWithEmailAndPassword(email, password);
            const user = await auth().currentUser;
            await user.updateProfile({ displayName: username });
            
            console.log("registered and logged in!");
            // redirect users to home (since they are auto logged in upon registration)
            history.push("/");

        } catch(currentError) {
            updateError(currentError);            
        }
    }
    
    return (
        <div className="register-container">
            <h1>Register</h1>
            {error && <p className="error">{error.message}</p>}
            <form onSubmit={ submitForm }>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={ username } 
                    onChange={ updateUsername } />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={ email } 
                    onChange={ updateEmail } />
                  <label htmlFor="password">Password</label>
                <input type="text" id="password" value={ password } 
                    onChange={ updatePassword } />
                <button className="register-button">Register!</button>
                <p>Already have an account? 
                    <Link className="login-button" to="/login">Login!</Link>
                </p>
            </form>
        </div>
    );
}