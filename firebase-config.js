// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPhlmCS7t_NV7VqhRtOiFGp1QFhLzqMh4",
  authDomain: "chat-7b8fc.firebaseapp.com",
  projectId: "chat-7b8fc",
  storageBucket: "chat-7b8fc.firebasestorage.app",
  messagingSenderId: "604456029175",
  appId: "1:604456029175:web:f61e014fe2113671a7bcf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
