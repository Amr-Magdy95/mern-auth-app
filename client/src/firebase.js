// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-58b8f.firebaseapp.com",
  projectId: "mern-auth-58b8f",
  storageBucket: "mern-auth-58b8f.appspot.com",
  messagingSenderId: "726284506082",
  appId: "1:726284506082:web:7dbd18a46d0b20176fdfbb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
