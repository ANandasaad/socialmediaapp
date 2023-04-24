// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBEdMvK__P4hvHDJa0CZ-8QsWLCqHVJek8",
  authDomain: "socialmedia-52eb8.firebaseapp.com",
  projectId: "socialmedia-52eb8",
  storageBucket: "socialmedia-52eb8.appspot.com",
  messagingSenderId: "915146139131",
  appId: "1:915146139131:web:c073eb0369efa1184d575e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db=getFirestore(app);
export {auth,db,onAuthStateChanged};