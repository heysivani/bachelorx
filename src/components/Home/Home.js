import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./Home.css";
import Chatbox from "./Chatbox";
import BachelorX from "./BachelorX";

export default function Home({ user }) {
    const [message, setMessage] = useState("");
    const [userTitle, setUserTitle] = useState("");
    const [bachelorX, setBachelorX] = useState(false);
    const [userList, setUserList] = useState([]);

    const updateUserList = (users) => {
        setUserList(users);
    }

    useEffect(() => {
        if(user) {
            // getting user title
            let title;
            const usersRef = db.ref("users");
            console.log("USER",user.uid);
            usersRef.on("value", snapshot => {
            const allUsers = snapshot.val();
            console.log("all users", allUsers);
            
            let usersArray = [];
            for(let user in allUsers) {
                usersArray.push({
                    id: user,
                    displayName: allUsers[user].displayName,
                    avatar: allUsers[user].avatar,
                    hearts: allUsers[user].hearts,
                    title: allUsers[user].title
                })
            }

            console.log("usersarray", usersArray);
            updateUserList(usersArray);
            console.log("user list updated!");

            title = allUsers[user.uid].title;
            console.log("title", title);
            
            // check if bachelor
            if(title === "bachelorX") {
                toggleBachelorX();
                console.log("toggling bachelorx!");
            }
            setUserTitle(title);
            })
        }
    }, [user]);

    const toggleBachelorX = () => {
        setBachelorX(true);
        console.log("bachelorX=", bachelorX);
    }

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
                avatar: user.photoURL,
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
                    <ul className="header">
                    {userList.map(user => {
                    return (
                        <li className="userlist" key={ user.id }>
                            <img className="header-avatar" src={ user.avatar } alt="user's avatar"/>
                            <p className="header-display-name">&nbsp;{ user.displayName }</p>
                            <p className="header-title">&nbsp;{ user.title }</p>
                        </li>
                    );
                    })}
                        {/* <img className="header-avatar" src={ user.photoURL } alt="user's avatar" />
                        <p className="header-display-name">&nbsp;{ user.displayName }</p>
                        <p className="header-title">&nbsp;{ userTitle }</p>
                        { bachelorX &&
                            <BachelorX />
                        }        */}
                    </ul>
                        
                    <Chatbox message={ message } bachelorX={ bachelorX } user={ user }/>
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