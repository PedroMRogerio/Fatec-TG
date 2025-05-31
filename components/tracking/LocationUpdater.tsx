import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/helpers/firebaseConfig';

interface Props {
  freteId: string;
  uidProv: string;
  active: boolean; // Ativa/desativa o envio
}

export default function LocationUpdater({ freteId, uidProv, active }: Props) {
  const locationWatcher = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      locationWatcher.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (location) => {
          const { latitude, longitude } = location.coords;
          try {
            await updateDoc(doc(db, 'fretes', freteId), {
              liveLocation: {
                lat: latitude,
                lng: longitude,
                updatedAt: new Date(),
              },
            });
          } catch (err) {
            console.error('Erro ao atualizar localização no Firestore:', err);
          }
        }
      );
    };

    if (active) startWatching();
    else if (locationWatcher.current) {
      locationWatcher.current.remove();
      locationWatcher.current = null;
    }

    return () => {
      if (locationWatcher.current) {
        locationWatcher.current.remove();
        locationWatcher.current = null;
      }
    };
  }, [active]);

  return null;
}
