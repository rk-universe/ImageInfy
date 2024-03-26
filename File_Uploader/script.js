
import app from "../assets/js/firebase.js";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getDatabase, ref as rtdbRef, set as rtdbSet,update as rtdbUpdate } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

//send request to server

// Example using AJAX (XMLHttpRequest)
var xhr = new XMLHttpRequest();
var url = "http://127.0.0.1:5000/data"; // Replace with your Flask server URL // Your data to send to the server

xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};





const auth = getAuth(app);
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    }
});

const storage = getStorage();
const database = getDatabase();

const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const progressArea = document.getElementById('progressArea');
const uploadedArea = document.getElementById('uploadedArea');

document.getElementById('uploadButton').addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
        uploadFile(file);
    });
});

async function uploadFile(file) {
    if (!currentUser) {
        console.error('User not logged in.');
        return;
    }

    const timestamp = Date.now();
    const fileName = `image/${timestamp}`;
    const storageRef = ref(storage, currentUser.uid +'/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const progressHTML = `<li class="row" id="progress-${timestamp}">
                              <i class="fas fa-file-alt"></i>
                              <div class="content">
                                <div class="details">
                                  <span class="name">${fileName} • Uploading</span>
                                  <span class="percent">0%</span>
                                </div>
                                <div class="progress-bar">
                                  <div class="progress" style="width: 0%"></div>
                                </div>
                              </div>
                          </li>`;
    uploadedArea.classList.add('onprogress');
    progressArea.innerHTML += progressHTML;

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const progressElement = document.getElementById(`progress-${timestamp}`);
            const progressBar = progressElement.querySelector('.progress');
            const percentText = progressElement.querySelector('.percent');

            progressBar.style.width = `${progress}%`;
            percentText.textContent = `${progress.toFixed(2)}%`;

            if (progress === 100) {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        // Store file metadata in Realtime Database under user's node
                        const fileData = {
                            fileName: fileName,
                            downloadURL: downloadURL

                        };
                        await rtdbSet(rtdbRef(database, `users/${currentUser.uid}/files/${timestamp}`), fileData);
                        const userRef = rtdbRef(database, `users/${currentUser.uid}`);
                        await rtdbUpdate(userRef, { file_uploaded: true });


                        //send request
                        if (xhr.readyState === XMLHttpRequest.OPENED) {
                            const data = JSON.stringify({
                                "uid": currentUser.uid,
                                "user": currentUser
                            });
                            xhr.send(data);
                        } else {
                            console.error('XHR object state is not OPENED.');
                        }
            
             
                        const uploadedHTML = `<li class="row">
                                                <div class="content upload">
                                                  <i class="fas fa-file-alt"></i>
                                                  <div class="details">
                                                    <span class="name">${fileName} • Uploaded</span>
                                                    <span class="size">${(snapshot.totalBytes / 1024).toFixed(2)} KB</span>
                                                  </div>
                                                </div>
                                                <i class="fas fa-check"></i>
                                              </li>`;
                        uploadedArea.classList.remove('onprogress');
                        uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML);
                        progressArea.removeChild(progressElement);
                    })
                
                
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            }
        },
        (error) => {
            console.error('Error uploading file:', error);
        }
    );
}


// async function fetchFilesForUser(userId) {
//     try {
//         const q = query(collection(firestore, 'files'), where('userId', '==', userId));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             console.log('File:', data.fileName, 'URL:', data.downloadURL);
//             // You can display or download files here
//         });
//     } catch (error) {
//         console.error('Error fetching files:', error);
//     }
// }

// // Example usage:
// // Fetch files for the current user
// if (currentUser) {
//     fetchFilesForUser(currentUser.uid);
// }
