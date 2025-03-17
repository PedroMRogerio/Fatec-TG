import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location'

type LocationType = Location.LocationObject | null;

export default function App() {
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Solicitar permissões de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão para acessar localização foi negada');
          return;
        }

        // Obter a localização atual
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        //console.log(currentLocation)
      } catch (error) {
        setErrorMsg('Erro ao obter localização');
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: location?.coords.latitude? location.coords.latitude:0,
        longitude: location?.coords.longitude? location.coords.longitude:0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});