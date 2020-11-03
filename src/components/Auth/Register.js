import React, { useState } from "react";
import { auth } from '../../firebase.js'
import { db } from '../../firebase.js'
import { Link, useHistory } from 'react-router-dom';
import "./Auth.css";
import Login from './Login';

import av0 from "../../images/av0.png";
import av1 from "../../images/av1.png";
import av2 from "../../images/av2.png";
import av3 from "../../images/av3.png";
import av4 from "../../images/av4.png";
import av5 from "../../images/av5.png";
import av6 from "../../images/av6.png";
import av7 from "../../images/av7.png";
import av8 from "../../images/av8.png";
import av9 from "../../images/av9.png";
import av10 from "../../images/av10.png";
import av11 from "../../images/av11.png";
import av12 from "../../images/av12.png";
import av13 from "../../images/av13.png";
import av14 from "../../images/av14.png";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [roleIndex, setRoleIndex] = useState(14);
    const [avIndex, setAvIndex] = useState(14);
    const history = useHistory();
    
    const [roles, setRoles] = useState([
        "dreamy dark matter",
        "comet casanova",
        "pretty pulsar",
        "lunar lover",
        "astral admirer",
        "galaxy gal",
        "titillating terrestrial",
        "rocket romeo",
        "big bang babe",
        "unidentified frisky orbit",
        "hubble hoe",
        "cosmic cutie",
        "raunchy red giant",
        "heavenly hottie", 
        "bachelorX"
    ]);

    const [avatars, setAvatars] = useState([
        "av0", "av1", "av2", "av3", "av4", "av5", "av6", "av7",
        "av8", "av9", "av10", "av11", "av12", "av13", "av14"
    ])

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
            await user.updateProfile({ 
                displayName: username,
                photoURL: avatars[avIndex]
            });

            console.log("registered photoURL", user.photoURL);

            // add user and custom properties to db
            db.ref("users/" + user.uid).set({
                role: "bachelorX",
                //avatar: user.photoURL
            })
            
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
                <label htmlFor="username">Username&nbsp;</label>
                <input type="text" id="username" value={ username } 
                    onChange={ updateUsername } />
                <label htmlFor="email">&nbsp;Email&nbsp;</label>
                <input type="text" id="email" value={ email } 
                    onChange={ updateEmail } />
                  <label htmlFor="password">&nbsp;Password (minimum 6 characters)&nbsp;</label>
                <input type="text" id="password" value={ password } 
                    onChange={ updatePassword } />
                <button className="register-button">Register!</button>
                <p>Already have an account?&nbsp;
                    <Link className="login-button" to="/login">Login!</Link>
                </p>
            </form>
        </div>
    );
}