import React, { useEffect, useState } from "react"
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native"
import MapView, { Marker } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import * as Location from "expo-location"

interface Coordinates {
  lat: number
  lng: number
}

interface RouteMapProps {
  destination: Coordinates
}

const GOOGLE_MAPS_API_KEY = process.env.API_KEY? process.env.API_KEY : '' // Substitua pela sua API Key

const RouteMapTrack: React.FC<RouteMapProps> = ({ destination }) => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Pedir permissão ao usuário para acessar a localização
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("Permissão negada", "Ative a localização para usar o mapa.")
          return
        }

        // Obter a posição atual
        const location = await Location.getCurrentPositionAsync({})
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      } catch (error) {
        Alert.alert("Erro", "Não foi possível obter sua localização.")
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!currentLocation) {
    return (
      <View style={styles.errorContainer}>
       {/* <Alert alert="Erro" message="Não foi possível obter a localização atual" /> */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marcador de Localização Atual */}
        <Marker
          coordinate={{ latitude: currentLocation.lat, longitude: currentLocation.lng }}
          title="Minha Localização"
          pinColor="blue"
        />

        {/* Marcador de Destino */}
        <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} title="Destino" />

        {/* Traçar a Rota */}
        <MapViewDirections
          origin={{ latitude: currentLocation.lat, longitude: currentLocation.lng }}
          destination={{ latitude: destination.lat, longitude: destination.lng }}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="blue"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default RouteMapTrack
