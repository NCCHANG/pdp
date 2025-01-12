import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


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
const db = getFirestore(app);


const submit = document.getElementById("proceedBtn");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    // Firebase Authentication - Create user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const user2F = { twofactor: false }; 

            const docRef = doc(db, "users", email);
            setDoc(docRef, user2F)
                .then(() => {
                    alert("Account created successfully!");
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Error writing document:", error.message);
                    alert("Error saving user data.");
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                alert("Email already in use. Please log in.");
            } else {
                alert(`Error: ${errorMessage}`);
            }
            console.error("Error creating user:", error.message);
        });
});
