// components/tracking/ProviderLocation.tsx
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/helpers/firebaseConfig";

interface Props {
  providerId: string;
}

export const ProviderLocation = ({ providerId }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (loc) => {
          setLocation(loc);
          await setDoc(doc(db, "provider_locations", providerId), {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            timestamp: new Date(),
          });
        }
      );
    };

    startLocationTracking();

    return () => {
      if (locationSubscription) locationSubscription.remove();
    };
  }, []);

  return (
    <View>
      {/* Comentado para não exibir no app do cliente */}
      {/* <Text>Localização do Provedor:</Text>
      <Text>{location?.coords.latitude}, {location?.coords.longitude}</Text> */}
    </View>
  );
};
