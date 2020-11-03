import React, { useState, useEffect } from "react";

export default function Chatbox() {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        console.log("chatbox mounted ayy");
    }, [])

    return (
        <div className="chatbox">
            <ul className="chat-list">
                <li>All our chat messages!</li>
            </ul>
        </div>
    );
}