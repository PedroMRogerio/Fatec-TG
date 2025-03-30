import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/helpers/firebaseConfig"

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    //console.log("Usuário logado com sucesso")
  } catch (error: any) {
    console.error("Erro ao logar:", error.message)
    throw new Error(error.message)
  }
}
