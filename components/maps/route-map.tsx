import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { pinStyles, trackStyles } from "./styles";

// TRAÇADOR DE ROTA ORIGEM - DESTINO

interface Coordinates {
  lat: number
  lng: number
}

interface RouteMapProps {
  origin: Coordinates
  destination: Coordinates
}

const GOOGLE_MAPS_API_KEY = process.env.API_KEY? process.env.API_KEY : ''

const RouteMap: React.FC<RouteMapProps> = ({ origin, destination }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.lat,
          longitude: origin.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marcador de Origem */}
        <Marker 
        coordinate={{ latitude: origin.lat, longitude: origin.lng }} 
        title="Origem" 
        pinColor={pinStyles.origin}
        />

        {/* Marcador de Destino */}
        <Marker 
        coordinate={{ latitude: destination.lat, longitude: destination.lng }} 
        title="Destino" 
        pinColor={pinStyles.destiny}
        />

        {/* Traçando a Rota */}
        <MapViewDirections
          origin={{ latitude: origin.lat, longitude: origin.lng }}
          destination={{ latitude: destination.lat, longitude: destination.lng }}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor={trackStyles.history}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
})

export default RouteMap
