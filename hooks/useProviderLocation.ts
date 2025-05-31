import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../helpers/firebaseConfig";

export function useProviderLocation(providerId?: string) {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!providerId) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      intervalRef.current = setInterval(async () => {
        const { coords } = await Location.getCurrentPositionAsync({});
        await setDoc(
          doc(db, "locations", providerId),
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }, 5000);
    })();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [providerId]);
}
