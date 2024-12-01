import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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


const submit = document.getElementById("signinBtn");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    // Firebase Authentication - Log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login successful!");
            window.location.href = 'yearlyCalendar.html'; // Redirect to main page or dashboard
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert("Incorrect password. Please try again.");
            } else if (errorCode === 'auth/user-not-found') {
                alert("No account found with this email. Please sign up.");
            } else {
                alert(`Error: ${errorMessage}`);
            }
            console.error("Error during login:", error.message);
        });
});
