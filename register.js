import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBSmA6GbO0yFSzx4WlOUNbzgSq9HvDrx48",
  authDomain: "time-management-f9a62.firebaseapp.com",
  projectId: "time-management-f9a62",
  storageBucket: "time-management-f9a62.firebasestorage.app",
  messagingSenderId: "102201778852",
  appId: "1:102201778852:web:89f7d19eec85d50b57bc31",
  measurementId: "G-6YL0RXGR9G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
        window.location.href = 'login.html'; // Redirect to login page
    } catch (error) {
        alert(error.message);
    }
});
