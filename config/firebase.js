// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWE6sdJ9fOGaGUO9xhNK3u0gbWhprC48g",
    authDomain: "collate-b66c6.firebaseapp.com",
    projectId: "collate-b66c6",
    storageBucket: "collate-b66c6.appspot.com",
    messagingSenderId: "64446656466",
    appId: "1:64446656466:web:3dab0c51668cf18631a20b"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Database
export const db = getFirestore(app);