import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

const colRef = collection(db, 'UserCli')

export default class UserCliQuery {
    static async getUsers(uid?: string) {
        console.log(uid)
        const q = uid ? query(colRef, where('status', '==', uid)) : colRef;
        const querySnapshot = await getDocs(q)
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return users
    }
}