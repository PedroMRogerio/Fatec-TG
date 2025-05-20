import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/helpers/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    //console.log("Usuário criado com sucesso")
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message)
    throw new Error(error.message)
  }
}

export interface NewUserCliProps {
  uid: string
  name: string
  cpf: string
  email: string
}
export interface NewUserProvProps {
  uid: string
  name: string
  cpf: string
  email: string
  cnh: string
}

export async function newUserCli({ uid, name, cpf, email }: NewUserCliProps): Promise<void> {
  try {
    const usersCollection = collection(db, "UserCli")

    await addDoc(usersCollection, {
      uid,
      name,
      cpf,
      email,
    })

    console.log("Novo cliente criado com sucesso!")
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    throw error
  }
}

export async function newUserProv({ uid, name, cpf, email, cnh }: NewUserProvProps): Promise<void> {
  try {
    const usersCollection = collection(db, "UserProv")

    await addDoc(usersCollection, {
      uid,
      name,
      cpf,
      email,
      cnh
    })

    console.log("Novo cliente criado com sucesso!")
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    throw error
  }
}