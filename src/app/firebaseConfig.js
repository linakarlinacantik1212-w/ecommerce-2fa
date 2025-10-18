// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQYHj9JIcmceb-5hUK8AWR09t8zSbVasQ",
  authDomain: "ecommerce-2fa.firebaseapp.com",
  projectId: "ecommerce-2fa",
  storageBucket: "ecommerce-2fa.firebasestorage.app",
  messagingSenderId: "385889115587",
  appId: "1:385889115587:web:490895c20a02e4ee4a3176",
  measurementId: "G-S35BYSR887"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);