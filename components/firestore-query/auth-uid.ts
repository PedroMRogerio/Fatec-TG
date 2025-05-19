import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/helpers/firebaseConfig'

export const useAuthUid = () => {
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
      } else {
        setUid(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return uid
}