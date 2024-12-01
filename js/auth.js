import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkBwCTHw56P2qs1n_Yl4HVVNhf0wNx1XM",
    authDomain: "project-daily-planner.firebaseapp.com",
    projectId: "project-daily-planner",
    storageBucket: "project-daily-planner.firebasestorage.app",
    messagingSenderId: "341596285306",
    appId: "1:341596285306:web:90197e8c4b3bcc181ecec3",
    measurementId: "G-LDCB4F40NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const submit = document.getElementById("proceedBtn");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    // Get values from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase Authentication - Create user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = { email: email }; 
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'main.html';
                })
                .catch((error) => {
                    console.error("Error writing document:", error.message);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
            console.error("Error:", error.message);
        });
});
