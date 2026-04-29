import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMQrlYspz9j8idt3z4oYnsip6DJJsX0L0",
  authDomain: "vicagtect-b8282.firebaseapp.com",
  projectId: "vicagtect-b8282",
  storageBucket: "vicagtect-b8282.firebasestorage.app",
  messagingSenderId: "1073745936763",
  appId: "1:1073745936763:web:46a9f288f75f5962acfdde",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
