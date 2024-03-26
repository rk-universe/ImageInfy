import app from "../../../assets/js/firebase.js";
import { getDatabase, ref as rtdbRef, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const auth = getAuth(app);
const database = getDatabase(app);
let currentUser = null;
let userData = null;

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if(currentUser){
        const userRef = rtdbRef(database, `users/${currentUser.uid}`);
        get(userRef)
            .then((snapshot) => {
                userData = snapshot.val();
                updateNavbar();
            })
            .catch((error) => {
                console.error('Error getting user data its my:', error);
            });
    } else {
        // User is not logged in, update navbar accordingly
        updateNavbar();
    }
});
  
// Get references to the navbar elements
const signInOption = document.getElementById('SignIn');
const signOutOption = document.getElementById('SignOut');
const userOption = document.getElementById('Username');
const usernameElement = document.getElementById('userAN');

// Function to update navbar based on user's sign-in status and data
function updateNavbar() {
    if (currentUser && userData) {
        // User is logged in and user data is available
        userOption.style.display = 'block';
        signOutOption.style.display = 'block';
        // Set the username
        usernameElement.textContent = 'Welcome '+userData.username;
    } else {
        signInOption.style.display = 'block'; // Show sign-in option
    }
}
