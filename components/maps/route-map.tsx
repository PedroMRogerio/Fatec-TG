import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { pinStyles, trackStyles } from "./styles";
import { getEndereco } from "./address-name";
import { db } from "@/helpers/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteMapProps {
  origin: Coordinates;
  destination: Coordinates;
  providerId?: string; 
  onDistanceChange?: (distance: number) => void;
}

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  destination,
  providerId,
  onDistanceChange,
}) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [originAddress, setOriginAddress] = useState<string>("Carregando endereço...");
  const [destinationAddress, setDestinationAddress] = useState<string>("Carregando endereço...");
  const [providerLocation, setProviderLocation] = useState<Coordinates | null>(null);

  // Buscar endereços
  useEffect(() => {
    getEndereco(origin.lat.toString(), origin.lng.toString())
      .then(setOriginAddress)
      .catch(() => setOriginAddress("Erro ao obter endereço"));

    getEndereco(destination.lat.toString(), destination.lng.toString())
      .then(setDestinationAddress)
      .catch(() => setDestinationAddress("Erro ao obter endereço"));
  }, [origin, destination]);

  // Escutar localização do provedor em tempo real
  useEffect(() => {
    if (!providerId) return;

    const unsub = onSnapshot(doc(db, "provider_locations", providerId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProviderLocation({
          lat: data.latitude,
          lng: data.longitude,
        });
      }
    });

    return () => unsub();
  }, [providerId]);

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  };

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
        <Marker
          coordinate={{ latitude: origin.lat, longitude: origin.lng }}
          title="Origem"
          description={originAddress}
          pinColor={pinStyles.origin}
        />

        <Marker
          coordinate={{ latitude: destination.lat, longitude: destination.lng }}
          title="Destino"
          description={destinationAddress}
          pinColor={pinStyles.destiny}
        />

        {providerLocation && (
          <Marker
            coordinate={{
              latitude: providerLocation.lat,
              longitude: providerLocation.lng,
            }}
            title="Provedor"
            description="Localização atual"
            pinColor={pinStyles.provider}
          />
        )}

        <MapViewDirections
          origin={{ latitude: origin.lat, longitude: origin.lng }}
          destination={{ latitude: destination.lat, longitude: destination.lng }}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          mode="DRIVING"
          strokeColor={trackStyles.history}
          onReady={(result) => {
            setDistance(result.distance);
            setDuration(result.duration);
            if (onDistanceChange) {
              onDistanceChange(result.distance);
            }
          }}
        />
      </MapView>

      {distance && duration && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Distância: {distance.toFixed(2)} km</Text>
          <Text style={styles.infoText}>Duração: {formatDuration(duration)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoBox: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
});

export default RouteMap;
