import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import app from "./firebase.js";

// Get a reference to the Firebase Auth instance
const auth = getAuth(app);

// Function to sign out the current user and redirect to the home page
function signOutUser() {
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        // Redirect the user to the home page
        window.location.href = "/"; // Change the URL to your home page
    }).catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
    });
}

// Call the signOutUser function when needed
// For example, when a "Sign Out" button is clicked
document.getElementById("SignOut").addEventListener("click", () => {
    signOutUser();
});
