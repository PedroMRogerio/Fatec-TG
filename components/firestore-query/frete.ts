import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

const colRef = collection(db, 'Frete')

export default class UserCliQuery {
    static async getFrete(userId: string) {
        const q = query(colRef, where('userId', '==', userId))
        const querySnapshot = await getDocs(q)
        const fretes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return fretes
    }
}