// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (from google-services.json)
const firebaseConfig = {
  apiKey: "AIzaSyBWQ0jDwdlYu8W2iVoNFZxkX635GFvv2lo",
  authDomain: "kc-carbon.firebaseapp.com",
  projectId: "kc-carbon",
  storageBucket: "kc-carbon.firebasestorage.app",
  messagingSenderId: "686094602481",
  appId: "1:686094602481:android:dd6f2f763eb0dc86069950"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Proper Auth persistence setup
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore
const db = getFirestore(app);

export { auth, db };
