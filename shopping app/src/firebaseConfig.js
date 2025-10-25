import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZsgcmIlQ-_e5Idv2ggsVF_f-YAyZEL_Q",
  authDomain: "shopease-2e8ac.firebaseapp.com",
  projectId: "shopease-2e8ac",
  storageBucket: "shopease-2e8ac.firebasestorage.app",
  messagingSenderId: "607932637697",
  appId: "1:607932637697:web:4293094cc98543585ed600",
  measurementId: "G-NN7CJ1H83W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
