import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "house-marketplace-250f0.firebaseapp.com",
  projectId: "house-marketplace-250f0",
  storageBucket: "house-marketplace-250f0.appspot.com",
  messagingSenderId: "142016618213",
  appId: "1:142016618213:web:2613cc6fa47ea4420a7e0c",
  measurementId: "G-2KFYLKVY65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
