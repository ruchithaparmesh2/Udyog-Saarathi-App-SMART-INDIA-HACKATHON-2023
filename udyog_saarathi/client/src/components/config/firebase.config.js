// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaWJD6GUswjdyBSk0dXVMe5rfq90PW9Eo",
  authDomain: "udyog-sarathi.firebaseapp.com",
  projectId: "udyog-sarathi",
  storageBucket: "udyog-sarathi.appspot.com",
  messagingSenderId: "164260379394",
  appId: "1:164260379394:web:37c5732ab0fe3c6880a01b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)
const storage = getStorage(app)
export {imgDB,txtDB,storage};