import { signOut } from "firebase/auth"
import { auth } from "@/helpers/firebaseConfig"

export const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log("Usuário deslogado com sucesso")
  } catch (error: any) {
    console.error("Erro ao deslogar:", error.message)
    throw new Error(error.message)
  }
}
