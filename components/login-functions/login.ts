import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/helpers/firebaseConfig"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    await AsyncStorage.setItem('@user', JSON.stringify({
      uid: user.uid,
      email: user.email
    }));

  } catch (error: any) {
    console.error("Erro ao logar:", error.message)
    throw new Error(error.message)
  }
}
