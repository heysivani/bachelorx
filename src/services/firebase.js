import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDVb87YQPwKtTB9Zlpzr-nOXgOOW0sP30Y",
    authDomain: "space-bae.firebaseapp.com",
    databaseURL: "https://space-bae.firebaseio.com",
    projectId: "space-bae",
    storageBucket: "space-bae.appspot.com",
    messagingSenderId: "1052432809531",
    appId: "1:1052432809531:web:040ba16b3b396d50cc661e",
    measurementId: "G-5Z8S6VX9KK"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();