import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDiKaQcdHAOp7qTGiZtp8RYbYF1o9yqI8",
  authDomain: "projt1-3abb3.firebaseapp.com",
  projectId: "projt1-3abb3",
  storageBucket: "projt1-3abb3.firebasestorage.app",
  messagingSenderId: "71332086103",
  appId: "1:71332086103:web:d32ca466b391364190fe12"
};

// Declare variables to store the app and db instances
let app = null;
let db = null;

export function initializeConnection() {
  // Initialize only once, on the first call
  if (!app && !db) {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    console.log("Firebase initialized");
  } else {
    console.log("Firebase already initialized");
  }

  return { app, db };
}
