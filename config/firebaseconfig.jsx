// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import ReactNativeAsyncStorage from "@firebase-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import{ getFirestore } from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseconfig = {
  apiKey: "AIzaSyB6wvqhFOcgjs-9N295UQPh0qT1BFoEYG8",
  authDomain: "rentapp-885ca.firebaseapp.com",
  projectId: "rentapp-885ca",
  storageBucket: "rentapp-885ca.firebasestorage.app",
  messagingSenderId: "867206828886",
  appId: "1:867206828886:web:2a04ccbb800c5de4a47cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseconfig);
export const auth = initializeAuth(app,{
    persistence : getReactNativePersistence(AsyncStorage)
});
export const db=getFirestore(app);
