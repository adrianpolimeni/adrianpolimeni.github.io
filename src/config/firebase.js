import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzmdR2CpJWDkr4NxsjJtbmrj9rNuBqN_I",
  authDomain: "itin-209f2.firebaseapp.com",
  projectId: "itin-209f2",
  storageBucket: "itin-209f2.appspot.com",
  messagingSenderId: "132254246469",
  appId: "1:132254246469:web:fba153a9b2d6338684e52c",
  measurementId: "G-HT9YCRL1RC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);