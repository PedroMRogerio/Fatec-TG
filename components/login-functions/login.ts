import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/helpers/firebaseConfig"

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user.uid
  } catch (error: any) {
    console.error("Erro ao logar:", error.message)
    throw new Error(error.message)
  }
}
