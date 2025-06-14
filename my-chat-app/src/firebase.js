import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxFx6R1u9KfhRWX77BH2o5uFwnPFG5wxM",
  authDomain: "bokbok-arsenalled-webapp.firebaseapp.com",
  projectId: "bokbok-arsenalled-webapp",
  storageBucket: "bokbok-arsenalled-webapp.firebasestorage.app",
  messagingSenderId: "1094899770809",
  appId: "1:1094899770809:web:40075a081aab9582408268"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
