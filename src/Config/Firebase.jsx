// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtjhVjQqCa2xO1MCYDY1HpPx48v5CCCTE",
    authDomain: "baatbox-5f6a0.firebaseapp.com",
    projectId: "baatbox-5f6a0",
    storageBucket: "baatbox-5f6a0.appspot.com",
    messagingSenderId: "225462028797",
    appId: "1:225462028797:web:c50abe34fe54859fd8f194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);