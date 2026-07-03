import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDC4Ovisd5JST4U3gBNorDmL52xi-dLiak",
  authDomain: "snapconnect-edb48.firebaseapp.com",
  projectId: "snapconnect-edb48",
  storageBucket: "snapconnect-edb48.firebasestorage.app",
  messagingSenderId: "485114664532",
  appId: "1:485114664532:web:a2b896026d9aaa427f3fc1",
  measurementId: "G-CSX87PNKK7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };