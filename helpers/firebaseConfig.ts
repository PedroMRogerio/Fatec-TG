// firebaseConfig.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.FB_KEY,
  authDomain: "teste-fatec-native-paper-caio.firebaseapp.com",
  projectId: "teste-fatec-native-paper-caio",
  storageBucket: "teste-fatec-native-paper-caio.firebasestorage.app",
  messagingSenderId: "121687340902",
  appId: "1:121687340902:web:cee2df74d154513fb67aa7",
  measurementId: "G-XC33KJJPVY"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
