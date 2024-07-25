import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz6vszARbLisw9uctYvfPvOX0qGh4H5oo",
  authDomain: "book-list-with-firebase-404cf.firebaseapp.com",
  projectId: "book-list-with-firebase-404cf",
  storageBucket: "book-list-with-firebase-404cf.appspot.com",
  messagingSenderId: "397623318059",
  appId: "1:397623318059:web:ac88c1abe3cba19b9c7c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);