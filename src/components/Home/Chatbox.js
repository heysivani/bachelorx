import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

export default function Chatbox({ message }) {
    const [chatList, setChatList] = useState([]);

    const updateChatList = (chats) => {
        setChatList(chats);
    }

    useEffect(() => {
        const chatRef = db.ref("chats");
        chatRef.on("value", snapshot => {
            // retrieves all our chats
            const allChats = snapshot.val();
            console.log("allChats", allChats);
            // array to push all our chat objects to
            let chatsArray = [];
            for(let chat in allChats) {
                // push each chat as object into array
                chatsArray.push({
                    // store uuid as id
                    id: chat,
                    message: allChats[chat].message,
                    user: allChats[chat].user,
                    timestamp: allChats[chat].timestamp
                })
            }
            updateChatList(chatsArray);
            console.log("chatbox mounted ayy");
        });
     }, [])

    return (
        <div className="chatbox">
            <ul className="chat-list">
                {chatList.map(chat => {
                    const postDate = new Date(chat.timestamp);
                    return (
                        <li key={ chat.id }>
                            <em>
                                { postDate.getDate()
                                    + "/" + (postDate.getMonth() + 1)}
                            </em>
                            <strong>{ chat.user }:</strong>
                            { chat.message }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}