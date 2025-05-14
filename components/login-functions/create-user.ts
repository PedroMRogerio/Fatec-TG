import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/helpers/firebaseConfig"

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    //console.log("Usuário criado com sucesso")
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message)
    throw new Error(error.message)
  }
}
