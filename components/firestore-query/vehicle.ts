import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

const colRef = collection(db, 'Vehicle');

export default class UserCliQuery {
    static async getVehicle(uid: string) {
        const q = query(colRef, where('uid', '==', uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return [];

        const vehicles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return vehicles;
    }
}