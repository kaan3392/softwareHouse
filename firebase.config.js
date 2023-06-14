// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {FIREBASE_API_KEY} from "@env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "softwarehouse-8a0d3.firebaseapp.com",
  projectId: "softwarehouse-8a0d3",
  storageBucket: "softwarehouse-8a0d3.appspot.com",
  messagingSenderId: "656926276831",
  appId: "1:656926276831:web:4020ad01c3330dc2e2fd6a",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
