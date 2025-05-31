import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../helpers/firebaseConfig';

export function useProviderLocationListener(providerId: string) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Para teste, usar ID fixo que você passou:
    const testProviderId = '0YnHIeGc6js7VKUH8YZS';

    const unsub = onSnapshot(doc(db, "locations", testProviderId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Location data from Firestore:', data);
        setLocation({
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        });
      } else {
        console.log('Documento de localização não encontrado!');
        setLocation(null);
      }
    });

    return () => unsub();
  }, []);

  return location;
}
