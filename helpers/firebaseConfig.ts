// firebaseConfig.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.FB_KEY,
  authDomain: "teste-fatec-native-paper-caio.firebaseapp.com",
  projectId: "teste-fatec-native-paper-caio",
  storageBucket: "teste-fatec-native-paper-caio.firebasestorage.app",
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURE_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
