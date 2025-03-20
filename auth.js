// ✅ Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    FacebookAuthProvider 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { showSuccessAlert, showErrorAlert } from './alert.js';

// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBSmA6GbO0yFSzx4WlOUNbzgSq9HvDrx48",
    authDomain: "time-management-f9a62.firebaseapp.com",
    projectId: "time-management-f9a62",
    storageBucket: "time-management-f9a62.appspot.com",
    messagingSenderId: "102201778852",
    appId: "1:102201778852:web:89f7d19eec85d50b57bc31",
    measurementId: "G-6YL0RXGR9G"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.elements['lgemail'].value.trim();
    const password = e.target.elements['lgpassword'].value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Save email to localStorage
        localStorage.setItem('email', user.email);

        // ✅ Get displayName for greeting
        const fullName = user.displayName || 'User';

        // alert(`Welcome back, ${fullName}`);
        showSuccessAlert(`Hello, ${fullName}`, 'Welcome back!');

        // ✅ Redirect to dashboard with fullName
        window.location.href = `dashboard.html?name=${encodeURIComponent(fullName)}`;
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            showErrorAlert('Incorrect password. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            showErrorAlert('No user found with this email. Please register first.');
        } else {
            // alert(error.message);
            showErrorAlert(error.message, 'Oops...');
        }
        console.error(error);
    }
});

// ✅ Handle Registration
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = e.target.elements['fullname'].value.trim();
    const email = e.target.elements['email'].value.trim();
    const password = e.target.elements['password'].value;
    const confirmPassword = e.target.elements['confirm_password'].value;

    if (password !== confirmPassword) {
        showErrorAlert('Passwords do not match!', 'Password Mismatch');
        return;
    }

    try {
        // ✅ Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Set displayName after user is created
        await updateProfile(user, {
            displayName: fullName
        });

        // ✅ Save user data to Firestore (optional)
        await setDoc(doc(db, 'users', user.uid), {
            fullName: fullName,
            email: email,
            createdAt: new Date()
        });

        showSuccessAlert(`Welcome, ${fullName}!`, 'Account Created');

        // ✅ Redirect to dashboard
        window.location.href = `dashboard.html?name=${encodeURIComponent(fullName)}`;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showErrorAlert('This email is already registered. Try logging in instead.');
        } else {
            showErrorAlert(error.message);
        }
        console.error(error);
    }
});

// ✅ Google Login
document.querySelector('.fab.fa-google').addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome, ${result.user.displayName}`);
        showSuccessAlert(`Welcome, ${result.user.displayName}!`);
        console.log(result.user);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

// ✅ GitHub Login
document.querySelector('.fab.fa-github').addEventListener('click', async () => {
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome, ${result.user.displayName}`);
        console.log(result.user);
    } catch (error) {
        showErrorAlert(error.message);
        console.error(error);
    }
});

// ✅ Facebook Login
document.querySelector('.fab.fa-facebook-f').addEventListener('click', async () => {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome, ${result.user.displayName}`);
        console.log(result.user);
    } catch (error) {
        showErrorAlert(error.message);
        console.error(error);
    }
});
