// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

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

export default app;
