import { collection, getDocs, query, where, doc, updateDoc, orderBy } from 'firebase/firestore'
import { db } from '@/helpers/firebaseConfig'

const colRef = collection(db, 'Frete')

export default class FreteQuery {
  static async getFrete(uid: string) {
    const q = query(colRef, where('uid', '==', uid))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return []

    const doc = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return doc
  }

  static async getFreteProv(uid: string) {
    const q = query(colRef, where('uidProv', '==', uid))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return []

    const doc = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return doc
  }

  static async getFreteAll() {
    const q = query(colRef, where('status', '==', 'open'))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return []

    const doc = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return doc
  }

  static async updateFreteStatus(freteId: string, status: string) {
  try {
    const freteDoc = doc(db, 'Frete', freteId)
    await updateDoc(freteDoc, { status })
    console.log(`Status do frete ${freteId} atualizado para ${status}`)
  } catch (error) {
    console.error(`Erro ao atualizar status do frete ${freteId}:`, error)
  }
}
}
