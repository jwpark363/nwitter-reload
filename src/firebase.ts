import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZRDhyIkQlMhhhlovzktvX9OtF-th38JM",
  authDomain: "fcevergreen-61a93.firebaseapp.com",
  projectId: "fcevergreen-61a93",
  storageBucket: "fcevergreen-61a93.firebasestorage.app",
  messagingSenderId: "983130526514",
  appId: "1:983130526514:web:db6aa034bd8a6978d0bd2b",
  measurementId: "G-WSMETRQ4FV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);