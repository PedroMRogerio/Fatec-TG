import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import * as Location from "expo-location"
import { doc, setDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/helpers/firebaseConfig"
import { useUser } from "@/contexts/userContext"

interface Props {
  providerId: string
}

export const ProviderLocation = ({ providerId }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const { user } = useUser()

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null
    let unsubscribeFirestore: (() => void) | null = null

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permissão de localização negada")
        return
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (loc) => {
          setLocation(loc)
          await setDoc(doc(db, "locations", providerId), {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            timestamp: new Date(),
          })
        }
      )
    }

    if (user?.uType === "cli") {
      // Cliente: escuta localização do provedor
      const providerDocRef = doc(db, "locations", providerId)
      unsubscribeFirestore = onSnapshot(providerDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          setLocation({
            coords: {
              latitude: data.latitude,
              longitude: data.longitude,
              accuracy: 0,
              altitude: 0,
              heading: 0,
              speed: 0,
              altitudeAccuracy: null,
            },
            timestamp: new Date(data.timestamp).getTime(),
          })
        }
      })
    } else {
      // Provedor: inicia rastreamento
      startLocationTracking()
    }

    return () => {
      if (locationSubscription) locationSubscription.remove()
      if (unsubscribeFirestore) unsubscribeFirestore()
    }
  }, [user?.uType, providerId])

  return (
    <View>
      {/* <Text>Localização do Provedor:</Text>
      <Text>{location?.coords.latitude}, {location?.coords.longitude}</Text> */}
    </View>
  )
}
