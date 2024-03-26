import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUljQI1iOhPhNLdi384wbrPJHUSQ80Wus",
    authDomain: "imageinfy.firebaseapp.com",
    projectId: "imageinfy",
    storageBucket: "imageinfy.appspot.com",
    messagingSenderId: "406941914128",
    appId: "1:406941914128:web:d79bf5e892524ef9302695",
    measurementId: "G-NZHENDYY1F"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
// // import app from "../../SignIn-SignUp-Form-main/script/firebase_auth";

// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// // Now you can use the initialized app object (app) and Firebase authentication methods
// const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in
//         console.log("User is signed in:", user);
//     } else {
//         // No user is signed in
//         console.log("No user is signed in");
//     }
// });

  export default app;
