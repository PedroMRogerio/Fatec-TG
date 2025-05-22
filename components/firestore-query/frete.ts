import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

const colRef = collection(db, 'Frete')

export default class FreteQuery {
  static async getFrete(uid: string) {
    const q = query(colRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];


    const doc = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return doc;
  }

  static async getFreteProv(uid: string) {
    const q = query(colRef, where('uidProv', '==', uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];


    const doc = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return doc;
  }
}