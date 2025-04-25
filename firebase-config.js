import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLFNXgusUvAi12Z9JsJ3SiJgdHWnizDqs",
  authDomain: "react-pokemon-9ec54.firebaseapp.com",
  projectId: "react-pokemon-9ec54",
  storageBucket: "react-pokemon-9ec54.firebasestorage.app",
  messagingSenderId: "5173143137",
  appId: "1:5173143137:web:14a4ee24a448d1cd0dec20",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
