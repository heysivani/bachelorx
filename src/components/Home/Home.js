import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./Home.css";
import Chatbox from "./Chatbox";

export default function Home({ user }) {
    const [message, setMessage] = useState("");

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    const submitMessage = (event) => {
        event.preventDefault();

        if(message !== "") {
            // if message is not empty...
            const chatRef = db.ref("chats");
            
            // create a chat object to store all properties
            const chat = {
                message: message,
                user: user.displayName,
                timestamp: new Date().getTime(),
                avatar: user.photoURL
            }

            // push this chat to the database~
            chatRef.push(chat);
            
            // reset message
            setMessage("");
        }
    }

    return (
        <div className="home-container">
            <h1>Space Bae</h1>
            { user &&
                <div className="allow-entry">
                    <Chatbox message={ message }/>
                    <form className="send-message"
                        onSubmit={ submitMessage }>
                        <input type="text" id="message" value={ message }
                        onChange={ updateMessage } 
                        placeholder="Type a message" />
                    </form>
                </div>
            }
            { !user &&
                <div className="deny-entry">
                    <p>
                        <Link to="/login">Login</Link>
                        &nbsp;or&nbsp; 
                        <Link to="/register">Register</Link>
                        &nbsp;to play Space Bae 😘
                    </p>
                </div>
            }
        </div>
    );
}