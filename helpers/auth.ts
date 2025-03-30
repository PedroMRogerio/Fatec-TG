import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { makeRedirectUri } from "expo-auth-session";


export function useGoogleAuth() {
  const [user, setUser] = useState<any>(null)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "121687340902-a9t97uhbb7e5uvmpfor97f963qfjfk6s.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(), 
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)

      signInWithCredential(auth, credential).then((userCredential) => {
        setUser(userCredential.user)
      })
    }
  }, [response])

  return { user, promptAsync }
}
