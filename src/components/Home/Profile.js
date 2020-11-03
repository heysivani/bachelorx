import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { db } from "../../firebase";
import "./Profile.css";

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

export default function Profile({ user }) {
    const [roleIndex, setRoleIndex] = useState();
    const [avatarIndex, setAvatarIndex] = useState();
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
        av0, av1, av2, av3, av4, av5, av6, av7,
        av8, av9, av10, av11, av12, av13, av14
    ])

    useEffect(() => {
        fetchData();
    }, [])

    const loopAvatarIndex = (currentIndex) => {
        // get current avatar index
        let nextIndex;
        if(currentIndex > 0) {
            // if we haven't reached 0 yet, decrement
            nextIndex = avatarIndex - 1;
        } else if(currentIndex === 0) {
            // reset cycle at last index
            nextIndex = avatars.length - 1;
        }
        // set in local state
        setAvatarIndex(nextIndex);
        // set in db
        db.ref("avatars").set({ index: nextIndex });
        console.log("new index", nextIndex);
    }
    
    const updateAvatarIndex = async (index) => {
        setAvatarIndex(index);
        console.log("current avatar index", avatarIndex);
    }

    const fetchData = async () => {
        const avatarRef = await db.ref("avatars")
        // const indexRef = await avatarRef.child("index");
        const avatarSnapshot = await avatarRef.once("value"); 
        console.log("av snap", avatarSnapshot);  
        const snapshotObj = await avatarSnapshot.val();
        console.log("snap obj", snapshotObj);
        const snapshotIndex = await snapshotObj.index;
        console.log("about to update snap index", snapshotIndex);

        updateAvatarIndex(snapshotIndex);
    }

    const updateUserProfile = async () => {
        await user.updateProfile({ 
            photoURL: avatars[avatarIndex]
        });

        console.log("registered photoURL", user.photoURL, " at index ", avatarIndex);

        // add user and custom properties to db
        // db.ref("users/" + user.uid).set({
        //     role: "bachelorX",
        // })

        // loop to next avatar index
        loopAvatarIndex(avatarIndex);

        history.push("/");
    }

    return (
        <div className="profile-container">
                <button 
                    className="profile-button"
                    onClick={ updateUserProfile }>
                    Roll a character</button>
        </div>
    )
}