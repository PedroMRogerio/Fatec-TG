import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

const colRef = collection(db, 'Frete')

export default class UserCliQuery {
    static async getFrete(uid: string) {
        const q = query(colRef, where('uid', '==', uid));
        const snapshot = await getDocs(q);
    
        if (snapshot.empty) return null;
    
        const doc = snapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        };
      }
    }