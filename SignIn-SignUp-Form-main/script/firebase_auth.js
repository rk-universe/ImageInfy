

// import app from "../../assets/js/firebase.js";

// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
  
 
//   const auth = getAuth(app);

//   const signupform = document.getElementById('signupform');
     
//   signupform.addEventListener('submit', (e) => {
//         e.preventDefault(); // Prevent the default form submission

//       const username = document.getElementById('username').value;
//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;
  
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       location.replace("../index.html")
//        // ...
     
//  })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//       var errorMessageElement = document.getElementById('errorMessage');
//     errorMessageElement.innerText = errorMessage;
//       // ..
//     });
//   });
import app from "../../assets/js/firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const auth = getAuth(app);
const database = getDatabase(app);

const signupform = document.getElementById('signupform');

signupform.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    signupform.disabled = true;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user information in the Realtime Database
            const userRef = ref(database, 'users/' + user.uid);
            set(userRef, {
                username: username,
                email: email,
                file_uploaded:false
            })
            .then(() => {
                console.log("User information stored successfully in the database");
                // Redirect to the homepage or any other desired page
                location.replace("../index.html");
            })
            .catch((error) => {
                console.error("Error storing user information:", error);
                // Delete the user if data storage fails
                user.delete()
                    .then(() => {
                        console.log("User deleted due to database error");
                    })
                    .catch((deleteError) => {
                        console.error("Error deleting user:", deleteError);
                    });
                // Display an error message to the user
                signupform.disabled = false;
                var errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.innerText = "Error creating user. Please try again later.";
            });
        })
        .catch((error) => {
          e.disabled = false;
            const errorMessage = error.message;
            console.log(errorMessage);
            var errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.innerText = errorMessage;
        });
});



  const signinform = document.getElementById('signinform');
     
  signinform.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the default form submission
      signinform.disabled = true;

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPass').value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    console.log(userCredential)
   location.replace("../index.html")
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    var errorMessageElement = document.getElementById('signinform_err');
  errorMessageElement.innerText = errorMessage;
  signinform.disabled = false;
    // ..
  });
})



// export default app;