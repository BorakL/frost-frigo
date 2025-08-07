// firebase.js (or firebase.ts)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPjNu78m28E6hTQOBB3wc98zS17AqjPE0",
  authDomain: "frost-frigo.firebaseapp.com",
  projectId: "frost-frigo",
  storageBucket: "frost-frigo.firebasestorage.app",
  messagingSenderId: "526737943653",
  appId: "1:526737943653:web:a6be31f8816eb35ba6ea8c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
