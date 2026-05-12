import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAJnS04WcEaSizVnd92hprBiml1XP7vzoE",
  authDomain: "borobbqorders.firebaseapp.com",
  projectId: "borobbqorders",
  storageBucket: "borobbqorders.firebasestorage.app",
  messagingSenderId: "608958491192",
  appId: "1:608958491192:web:a35df22ce7067f582d54cd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
};
