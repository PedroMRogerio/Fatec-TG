import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import * as AuthSession from "expo-auth-session"
import { auth } from "./firebaseConfig"
import { makeRedirectUri } from "expo-auth-session"

const useProxy = true
const redirectUri = makeRedirectUri({ useProxy })

export async function signInWithGoogle() {
  try {
    const CLIENT_ID = "121687340902-a9t97uhbb7e5uvmpfor97f963qfjfk6s.apps.googleusercontent.com"

    const discovery = {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    }

    const response = await AuthSession.startAsync({
      authUrl: `${discovery.authorizationEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20profile%20email`,
    })

    if (response.type === "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      await signInWithCredential(auth, credential)
      return auth.currentUser
    }
  } catch (error) {
    console.error("Erro ao autenticar com Google:", error)
  }
}
