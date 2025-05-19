// firebaseConfig.ts ou firebase.ts

import { getFirestore } from "firebase/firestore"
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_KEY,
  authDomain: "teste-fatec-native-paper-caio.firebaseapp.com",
  projectId: "teste-fatec-native-paper-caio",
  storageBucket: "teste-fatec-native-paper-caio.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASURE_ID
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
