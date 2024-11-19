// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwZjblAE7-X2fM425KDZss1fnltIGWobI",
  authDomain: "project-management-23d0f.firebaseapp.com",
  projectId: "project-management-23d0f",
  storageBucket: "project-management-23d0f.firebasestorage.app",
  messagingSenderId: "733469259743",
  appId: "1:733469259743:web:c73549d571f6ada971366a",
  measurementId: "G-ZS4VBFFLDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db }; // Make sure `db` is exported