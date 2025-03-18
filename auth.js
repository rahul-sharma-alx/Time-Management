import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "index.html";
});

// document.getElementById("registerBtn").addEventListener("click", async () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   console.log(email, password);
  
//   await createUserWithEmailAndPassword(auth, email, password);
//   window.location.href = "index.html";
// });

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Registration failed:", error.message);
    alert(error.message);
  }
});
