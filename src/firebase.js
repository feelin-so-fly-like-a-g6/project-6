// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";


// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/database";

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBk6aNK81E9i8yvY4Oc355hl2H6x8z7vp0",
        authDomain: "haiku-ahoy.firebaseapp.com",
        projectId: "haiku-ahoy",
        storageBucket: "haiku-ahoy.appspot.com",
        messagingSenderId: "342321447502",
        appId: "1:342321447502:web:05c7ed94699f12c186b91f"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;