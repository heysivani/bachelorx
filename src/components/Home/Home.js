import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ user }) {
    return (
        <div className="home-container">
            <h1>Chatroom</h1>
            { user &&
                <div className="allow-chatroom">
                    Chatroom here
                </div>
            }
            { !user &&
                <div className="deny-chatroom">
                    <p>
                        <Link to="/login">Login</Link>
                        &nbsp;or&nbsp; 
                        <Link to="/register">Register</Link>
                        &nbsp;to enter the chatroom 😘
                    </p>
                </div>
            }
        </div>
    );
}