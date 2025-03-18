// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSmA6GbO0yFSzx4WlOUNbzgSq9HvDrx48",
  authDomain: "time-management-f9a62.firebaseapp.com",
  projectId: "time-management-f9a62",
  storageBucket: "time-management-f9a62.appspot.com",
  messagingSenderId: "102201778852",
  appId: "1:102201778852:web:89f7d19eec85d50b57bc31",
  measurementId: "G-6YL0RXGR9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const punchInBtn = document.getElementById("punchInBtn");
const punchOutBtn = document.getElementById("punchOutBtn");
const timerEl = document.getElementById("timer");
const historyTable = document.getElementById("historyTable");
const logoutBtn = document.getElementById("logoutBtn");

let countdownInterval;
let punchInTime = null;
let remainingTime = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
let isCounting = false;

// Load Punch In time from Firestore on page load
async function loadLastPunchIn() {
  if (!auth.currentUser) return;

  const q = query(
    collection(db, "punches"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("punchInTime", "desc")
  );
  const querySnapshot = await getDocs(q);

  let lastPunch = null;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.punchInTime && !data.punchOutTime) {
      lastPunch = new Date(data.punchInTime);
    }
  });

  if (lastPunch) {
    punchInTime = lastPunch;
    const now = new Date();
    const diff = now - punchInTime;
    remainingTime = Math.max(8 * 60 * 60 * 1000 - diff, 0);

    if (remainingTime > 0) {
      startCountdown(punchInTime);
    }
  }
}

// Handle Punch In
punchInBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    alert("Please log in first.");
    return;
  }

  if (!punchInTime) {
    punchInTime = new Date();

    await addDoc(collection(db, "punches"), {
      userId: auth.currentUser.uid,
      punchInTime: punchInTime.toISOString()
    });

    startCountdown(punchInTime);
    loadHistory();
  } else {
    alert("You have already punched in!");
  }
});

// Handle Punch Out
punchOutBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    alert("Please log in first.");
    return;
  }

  if (punchInTime) {
    const punchOutTime = new Date();

    // Save Punch Out time
    await addDoc(collection(db, "punches"), {
      userId: auth.currentUser.uid,
      punchOutTime: punchOutTime.toISOString()
    });

    // PAUSE countdown instead of resetting
    clearInterval(countdownInterval);
    isCounting = false;

    loadHistory();
  } else {
    alert("You need to Punch In first.");
  }
});

// Countdown Timer
function startCountdown(startTime) {
  if (isCounting) return;

  isCounting = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = now - startTime;
    remainingTime = Math.max(8 * 60 * 60 * 1000 - diff, 0);

    const hours = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, "0");

    timerEl.innerHTML = `${hours}:${minutes}:${seconds}`;

    if (remainingTime === 0) {
      clearInterval(countdownInterval);
      isCounting = false;
      punchInTime = null;
      alert("8 hours completed! You earned a reward!");
    }
  }, 1000);
}

// Load History
async function loadHistory() {
  historyTable.innerHTML = "";
  const q = query(
    collection(db, "punches"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("punchInTime", "desc")
  );
  const querySnapshot = await getDocs(q);

  let history = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const date = new Date(data.punchInTime || data.punchOutTime).toLocaleDateString();

    if (!history[date]) {
      history[date] = [];
    }

    history[date].push({
      punchIn: data.punchInTime ? new Date(data.punchInTime).toLocaleTimeString() : "--",
      punchOut: data.punchOutTime ? new Date(data.punchOutTime).toLocaleTimeString() : "--"
    });
  });

  for (const [date, entries] of Object.entries(history)) {
    entries.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${date}</td>
        <td>${entry.punchIn || "--"}</td>
        <td>${entry.punchOut || "--"}</td>
      `;
      historyTable.appendChild(row);
    });
  }
}

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

// Prevent access if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadHistory();
    loadLastPunchIn(); // Load last Punch In time and resume countdown
  }
});
