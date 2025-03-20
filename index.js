import app from './firebase-config.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const auth = getAuth(app);

const btnStart = document.getElementById('btnGetStart');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        if (auth.currentUser) {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'login.html';
        }
    });
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log('User is not logged in');
        window.location.href = 'login.html';
    }
});

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        console.log('User logging out...');
        await signOut(auth);
        window.location.href = 'login.html'; // Redirect to login after logout
    });
}
